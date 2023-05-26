const fs = require("fs");
const amqp = require("amqplib");

const { Readable } = require("stream");
const dotenv = require("dotenv");

// Load the environment variables from .env file
dotenv.config();

async function consumeFile() {
  const RABBITMQ_URL = process.env.RABBITMQ_URL;
  const queueName = process.env.LINEANNOTATIONQUEUE;

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
          const info = JSON.parse(msg.properties.headers?.FleInfo);
          console.log(info);
          const path = `utils/Files/CSV/${info.filename}`;
          // Get the file content from the message
          const fileContent = msg.content;

          // Create a readable stream from the file content buffer
          const readableStream = new Readable();
          readableStream.push(fileContent);
          readableStream.push(null); // Signals the end of the stream

          // Write the message content to a file
          const fileStream = fs.createWriteStream(path);
          readableStream.pipe(fileStream);

          // Handle the end of the file stream
          fileStream.on("finish", () => {
            console.log("File received and saved:", path);

            channel.ack(msg); // Acknowledge the message
          });

          // Handle errors during file streaming
          fileStream.on("error", (error) => {
            console.error("Error saving file:", error);
            channel.ack(msg); // Acknowledge the message even in case of error
          });
        }
      });
    } catch (err) {
      console.error("Error consuming file:", err);
    }
  }
}

module.exports = { consumeFile };
