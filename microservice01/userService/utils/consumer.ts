import * as amqp from "amqplib";

import dotenv from "dotenv";

import { chargeOrGive } from "./mongo";

// Load the environment variables from .env file
dotenv.config();
async function consumeCharge() {
  //console.log(process.env);
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const queueName: string | undefined = process.env.FROMLINECHARGE;

  if (RABBITMQ_URL && queueName) {
    try {
      // Connect to RabbitMQ
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();

      // Assert the queue
      await channel.assertQueue(queueName);

      console.log(`Waiting for file messages from ${queueName}...`);

      // Consume messages from the queue
      channel.consume(queueName, async (msg) => {
        if (msg) {
          const chargeto = JSON.parse(msg.content.toString()) as {
            user_id: string;
          };

          console.log(chargeto);
          chargeOrGive(chargeto.user_id, -1, 1)
            .then(() => {})
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              channel.ack(msg);
            });
          // Create a readable stream from the file content buffer
        }
      });
    } catch (err) {
      console.error("Error consuming file:", err);
      setTimeout(consumeCharge, 5000);
    }
  }
}
async function consumePacket() {
  //console.log(process.env);
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const queueName: string | undefined = process.env.FROMPURCHASEPACKET;

  if (RABBITMQ_URL && queueName) {
    try {
      // Connect to RabbitMQ
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();

      // Assert the queue
      await channel.assertQueue(queueName);

      console.log(`Waiting for file messages from ${queueName}...`);

      // Consume messages from the queue
      channel.consume(queueName, async (msg) => {
        if (msg) {
          const purchaseto = JSON.parse(msg.content.toString()) as {
            user_id: string;
            credits: number;
          };
          console.log(purchaseto);
          if (purchaseto.credits > 0) {
            chargeOrGive(purchaseto.user_id, purchaseto.credits, 0)
              .then(() => {})
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                channel.ack(msg);
              });
          } else {
            channel.ack(msg);
          }
          // Create a readable stream from the file content buffer
        }
      });
    } catch (err) {
      console.error("Error consuming file:", err);
      setTimeout(consumePacket, 5000);
    }
  }
}
function Consumers() {
  consumeCharge();
  consumePacket();
}
export { Consumers };
