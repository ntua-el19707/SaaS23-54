import * as amqp from "amqplib/callback_api";

async function PruduceGifts(
  user_id: string,
  msg: string,
  credits: number,
  name: string
) {
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const ExchangeQue: string | undefined = process.env.GIFT_EXCHANGE;
  const routingKey: string | undefined = process.env.ROUTINGKEYGIFT;
  const channelName: string | undefined = process.env.GIFTCHANNEL;
  if (RABBITMQ_URL && ExchangeQue && routingKey && channelName) {
    //message  i am going to sen purchace service to log the gift
    const message: {
      user_id: string;
      msg: string;
      credits: number;
      name: string;
    } = {
      user_id,
      msg,
      credits,
      name,
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
              channel.assertQueue(channelName, { durable: true });
              console.log(`Channel ${channelName} created`);

              const payload = Buffer.from(JSON.stringify(message));
              channel.sendToQueue(channelName, payload);
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
export { PruduceGifts };
