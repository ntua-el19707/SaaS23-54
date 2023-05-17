import * as fs from "fs";
import * as amqp from "amqplib";

import { Readable } from "stream";
import dotenv from "dotenv";
import { ChartRecord, linesChart } from "./interfaces/sechema";
import { insertLineChart } from "./mongo";

// Load the environment variables from .env file
dotenv.config();
async function consumeChartLine() {
  //console.log(process.env);
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const queueName: string | undefined = process.env.LINECHARTQUEUE;

  if (RABBITMQ_URL && queueName) {
    try {
      // Connect to RabbitMQ
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();

      // Assert the queue
      await channel.assertQueue(queueName);

      console.log("Waiting for file messages...");

      // Consume messages from the queue
      channel.consume(queueName, async (msg) => {
        if (msg) {
          const info = JSON.parse(msg.content.toString()) as {
            chart: linesChart;
            ownerShip: string;
            create: string;
          };

          const chart: ChartRecord = {
            chart: info.chart,
            ownerShip: info.ownerShip,
            createAT: info.create,
          };

          // Get the file content from the message
          insertLineChart(chart)
            .then(() => {})
            .catch((err) => {})
            .finally(() => {
              channel.ack(msg);
            });

          // Create a readable stream from the file content buffer
        }
      });
    } catch (err) {
      console.error("Error consuming file:", err);
    }
  }
}
function Consumers() {
  consumeChartLine();
}
export { Consumers };
