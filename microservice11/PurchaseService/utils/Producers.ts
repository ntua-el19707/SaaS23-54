import * as amqp from "amqplib/callback_api";
import Redis from "ioredis";
async function PublishPurchasedPackage(user_id: string, credits: number) {
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const queueName: string | undefined = process.env.TOAUTHPURCHASEPACKET;

  if (RABBITMQ_URL && queueName) {
    const redis = new Redis({
      host: "saas23-54-redis-1", // the service name defined in the docker-compose.yml file
      port: 6379, // the mapped port
    });
    redis.get(`${user_id}Credits`, (err, value) => {
      if (err) {
      } else {
        if (value) redis.set(`${user_id}Credits`, value + credits);
      }
    });

    //message  i am going to sen purchace service to log the gift
    const message: {
      user_id: string;
      credits: number;
    } = {
      user_id,
      credits,
    };
    try {
      const connection = await amqp.connect(
        RABBITMQ_URL,
        async (err, conn: amqp.Connection) => {
          if (err) {
            throw err;
          }
          const channel = await conn.createChannel(
            (err, channel: amqp.Channel) => {
              if (err) {
                throw err;
              }
              channel.assertQueue(queueName, { durable: true });
              console.log(`Channel ${queueName} created`);

              const payload = Buffer.from(JSON.stringify(message));
              channel.sendToQueue(queueName, payload);
              console.log(`mesage ${message} has been send`);
            }
          );
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}
export { PublishPurchasedPackage };
