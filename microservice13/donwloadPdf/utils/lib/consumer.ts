import * as fs from "fs";
import * as amqp from "amqplib";
import { generateRandomString } from "../genarateRandomString";
import { Readable } from "stream";
import dotenv from "dotenv";
import { downloadDocs } from "../interfaces/docs";
import { insertChart } from "./mongodb";

// Load the environment variables from .env file
dotenv.config();
async function consumeFile() {
  //console.log(process.env);
  const RABBITMQ_URL: string | undefined = process.env.RABBITMQ_URL;
  const queueName: string | undefined = process.env.PDFCHANNEL;

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
          console.log(msg.properties.headers);
          const fileName = generateRandomString(15);

          const path = `utils/Files/pdf/${fileName}.pdf`;
          const info = JSON.parse(msg.properties.headers?.FleInfo) as {
            chart_id: string;
            owner: string;
          };
          console.log(info);
          // Get the file content from the message
          const fileContent = msg.content;
          // Create a readable stream from the file content buffer
          const readableStream: Readable = new Readable();
          readableStream.push(fileContent);
          readableStream.push(null); // Signals the end of the stream

          // Write the message content to a file

          const fileStream = fs.createWriteStream(path);
          readableStream.pipe(fileStream);

          // Handle the end of the file stream
          fileStream.on("finish", () => {
            console.log("File received and saved:", path);
            const doc: downloadDocs = {
              chart_id: info.chart_id,
              ownerShip: info.owner,
              timestamp: Date(),
              file: fileName,
            };
            insertChart(doc)
              .then(() => {})
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                channel.ack(msg); // Acknowledge the message
              });
          });

          // Handle errors during file streaming
          fileStream.on("error", (error) => {
            console.error("Error saving file:", error);
            channel.ack(msg); // Acknowledge the message even in case of error
          });
        }
      });
    } catch (err) {
      // console.error("Error consuming file:", err);
      setTimeout(consumeFile, 1000);
    }
  }
}
export { consumeFile };
