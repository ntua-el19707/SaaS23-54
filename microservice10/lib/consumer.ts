import * as amqp from "amqplib";
import dotenv from "dotenv";
import {
  ChartRecord,
  NetworkChart,
  PollarChart,
  linesChart,
} from "./interfaces/sechema";
import {
  insertLineChart,
  insertNetworkChart,
  insertPollarChart,
} from "./mongo";

// Load the environment variables from .env file
dotenv.config();

// Consume messages for line chart
async function consumeChartLine() {
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const queueName: string | undefined = process.env.LINECHARTQUEUE;

  if (RABBITMQ_URL && queueName) {
    try {
      // Connect to RabbitMQ
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();

      // Assert the queue
      await channel.assertQueue(queueName);

      console.log(`Waiting for file messages... ${queueName}`);

      // Consume messages from the queue
      channel.consume(queueName, async (msg) => {
        if (msg) {
          // Parse the message content
          const info = JSON.parse(msg.content.toString()) as {
            chart: linesChart;
            ownerShip: string;
            create: string;
          };

          // Create a chart record object
          const chart: ChartRecord = {
            chart: info.chart,
            ownerShip: info.ownerShip,
            createAT: info.create,
          };

          // Insert the line chart into the database
          insertLineChart(chart)
            .then(() => {})
            .catch((err) => {})
            .finally(() => {
              channel.ack(msg);
            });
        }
      });
    } catch (err) {
      console.error("Error consuming file:", err);
    }
  }
}

// Consume messages for network chart
async function consumeChartNetwork() {
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const queueName: string | undefined = process.env.NETWORKCHARTQUEUE;

  if (RABBITMQ_URL && queueName) {
    try {
      // Connect to RabbitMQ
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();

      // Assert the queue
      await channel.assertQueue(queueName);

      console.log(`Waiting for file messages... ${queueName}`);

      // Consume messages from the queue
      channel.consume(queueName, async (msg) => {
        if (msg) {
          // Parse the message content
          const info = JSON.parse(msg.content.toString()) as {
            chart: NetworkChart;
            ownerShip: string;
            create: string;
          };

          // Create a chart record object
          const chart: ChartRecord = {
            chart: info.chart,
            ownerShip: info.ownerShip,
            createAT: info.create,
          };

          // Insert the network chart into the database
          insertNetworkChart(chart)
            .then(() => {})
            .catch((err) => {})
            .finally(() => {
              channel.ack(msg);
            });
        }
      });
    } catch (err) {
      console.error("Error consuming file:", err);
    }
  }
}

// Consume messages for pollar chart
async function consumeChartPollar() {
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const queueName: string | undefined = process.env.POLLARCHARTQUEUE;

  if (RABBITMQ_URL && queueName) {
    try {
      // Connect to RabbitMQ
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();

      // Assert the queue
      await channel.assertQueue(queueName);

      console.log(`Waiting for file messages... ${queueName}`);

      // Consume messages from the queue
      channel.consume(queueName, async (msg) => {
        if (msg) {
          // Parse the message content
          const info = JSON.parse(msg.content.toString()) as {
            chart: PollarChart;
            ownerShip: string;
            create: string;
          };

          // Create a chart record object
          const chart: ChartRecord = {
            chart: info.chart,
            ownerShip: info.ownerShip,
            createAT: info.create,
          };

          // Insert the pollar chart into the database
          insertPollarChart(chart)
            .then(() => {})
            .catch((err) => {})
            .finally(() => {
              channel.ack(msg);
            });
        }
      });
    } catch (err) {
      console.error("Error consuming file:", err);
    }
  }
}

/**
 * consumers - run the consumers
 */
function Consumers() {
  consumeChartLine();
  consumeChartNetwork();
  consumeChartPollar();
}

export { Consumers };
