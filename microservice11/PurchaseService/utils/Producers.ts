import * as amqp from "amqplib/callback_api";

async function PublishPurchasedPackage(user_id: string, credits: number) {
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const queueName: string | undefined = process.env.TOAUTHPURCHASEPACKET;
  if (RABBITMQ_URL && queueName) {
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
