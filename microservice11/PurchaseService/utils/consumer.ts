import * as amqp from "amqplib";
import dotenv from "dotenv";
import { gift, purchasedChartFunction } from "./mongo";
import { clients } from "./interfaces/user";
import { packet } from "./interfaces/packet";
import { purchasedChart } from "./interfaces/Purchsased";

// Load the environment variables from .env file
dotenv.config();
async function consumeGiftMessages() {
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const ExchangeQue: string | undefined = process.env.GIFT_EXCHANGE;
  const routingKey: string | undefined = process.env.ROUTINGKEYGIFT;
  const channelName: string | undefined = process.env.GIFTCHANNEL;
  console.log(RABBITMQ_URL);
  if (RABBITMQ_URL && ExchangeQue && routingKey && channelName) {
    try {
      const connection: amqp.Connection = await amqp.connect(RABBITMQ_URL);
      const channel: amqp.Channel = await connection.createChannel();

      await channel.assertQueue(channelName, { durable: true });

      console.log("Waiting for messages...");

      channel.consume(channelName, (msg) => {
        if (msg) {
          const content = msg.content.toString();
          console.log("Received message:", content);
          const giftTo = JSON.parse(content) as {
            user_id: string;
            msg: string;
            credits: number;
            name: string;
          };
          const client: clients = { user_id: giftTo.user_id };
          const packet: packet = { credits: giftTo.credits, name: giftTo.name };

          gift(client, packet, giftTo.msg)
            .then(() => {
              console.log("client  gift register");
            })
            .catch((err) => {
              console.log(err);
            });
          // Acknowledge the message
          channel.ack(msg);
        }
      });
    } catch (err) {
      console.error(err);
      setTimeout(consumeGiftMessages, 5000);
    }
  }
}
async function consumePurchases() {
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;

  const queueName: string | undefined = process.env.QUEUEPURCHASEFROMLINE;
  console.log(RABBITMQ_URL);
  if (RABBITMQ_URL && queueName) {
    try {
      const connection: amqp.Connection = await amqp.connect(RABBITMQ_URL);
      const channel: amqp.Channel = await connection.createChannel();

      await channel.assertQueue(queueName, { durable: true });

      console.log("Waiting for messages...");

      channel.consume(queueName, (msg) => {
        if (msg) {
          const content = msg.content.toString();
          console.log("Received message:", content);
          const purchasedChart = JSON.parse(content) as {
            user_id: string;
            chart_id: string;
          };
          console.log(purchasedChart);

          purchasedChartFunction(
            purchasedChart.chart_id,
            purchasedChart.user_id
          )
            .then(() => {
              //here communication  with user to reduce cretids
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              // Acknowledge the message
              channel.ack(msg);
            });
        }
      });
    } catch (err) {
      console.error(err);
      setTimeout(consumePurchases, 5000);
    }
  }
}
function Consumers() {
  consumeGiftMessages();
  consumePurchases();
}

export { Consumers };
