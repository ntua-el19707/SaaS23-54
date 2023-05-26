require("dotenv").config();

const amqp = require("amqplib");
const fs = require("fs");
function sendFile(filePath, filInfo, queueName) {
  return new Promise(async (resolve, reject) => {
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    console.log(RABBITMQ_URL);
    if (RABBITMQ_URL) {
      try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        channel.assertQueue(queueName, { durable: true });
        const filestream = fs.createReadStream(filePath);
        const streamContent = await streamToBuffer(filestream);

        const messageHeaders = {
          FleInfo: JSON.stringify(filInfo),
        };
        channel.sendToQueue(queueName, streamContent, {
          headers: messageHeaders,
          persistent: true,
        });
        console.log("send" + queueName);
        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
}
function sendFiles(chart_id, owner, fileName) {
  // Get the channel names from environment variables
  const HTMLQUEUE = process.env.HTMLQUEUE;
  const SVGQUEUE = process.env.SVGQUEUE;
  const PDFQUEUE = process.env.PDFQUEUE;
  const PNGQUEUE = process.env.PNGQUEUE;

  // Define the file paths for each file type
  const HtmlPath = `utils/Files/html/${fileName}.html`;
  const SvgPath = `utils/Files/svg/${fileName}.svg`;
  const PdfPath = `utils/Files/pdf/${fileName}.pdf`;
  const PngPath = `utils/Files/png/${fileName}.png`;

  // Create the file info object
  const FileInfo = {
    chart_id,
    owner,
  };

  // Array to store promises for each file upload
  let promises = [];

  // Send HTML file if the channel is defined
  if (HTMLQUEUE) {
    promises.push(sendFile(HtmlPath, FileInfo, HTMLQUEUE));
  }

  // Send SVG file if the channel is defined
  if (SVGQUEUE) {
    promises.push(sendFile(SvgPath, FileInfo, SVGQUEUE));
  }

  // Send PDF file if the channel is defined
  if (PDFQUEUE) {
    promises.push(sendFile(PdfPath, FileInfo, PDFQUEUE));
  }

  // Send PNG file if the channel is defined
  if (PNGQUEUE) {
    promises.push(sendFile(PngPath, FileInfo, PNGQUEUE));
  }
  promises.push(PurchaceChart(chart_id, owner));
  // Return a promise that resolves when all file uploads are completed
  return Promise.all(promises);
}
// Helper function to convert a readable stream to a buffer
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
function PurchaceChart(chart_id, user_id) {
  return new Promise(async (resolve, reject) => {
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    const PURCHASE_QUEUE = process.env.PURCHASE_QUEUE;
    console.log(RABBITMQ_URL && PURCHASE_QUEUE);
    if (RABBITMQ_URL) {
      try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        channel.assertQueue(PURCHASE_QUEUE, { durable: true });
        const message = {
          chart_id,
          user_id,
        };

        const payload = Buffer.from(JSON.stringify(message));
        channel.sendToQueue(PURCHASE_QUEUE, payload);
        console.log("send");
        // Close the channel and connection
        //await channel.close();
        // /await connection.close();
        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
}
function PublisDiagram(chart, ownerShip) {
  return new Promise(async (resolve, reject) => {
    const message = {
      chart,
      ownerShip,
      create: Date(),
    };
    const payload = Buffer.from(JSON.stringify(message));
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    const queueName = process.env.TOMYDIAGRAMSQUES;
    console.log(RABBITMQ_URL);
    if (RABBITMQ_URL && queueName) {
      try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        channel.assertQueue(queueName, { durable: true });

        channel.sendToQueue(queueName, payload);
        console.log("send" + queueName);

        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
}
function Charge(user_id) {
  return new Promise(async (resolve, reject) => {
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    const queueName = process.env.TOAUTHQUEUE;
    console.log(RABBITMQ_URL && queueName);
    if (RABBITMQ_URL) {
      try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        channel.assertQueue(queueName, { durable: true });
        const message = {
          user_id,
        };
        const payload = Buffer.from(JSON.stringify(message));
        channel.sendToQueue(queueName, payload);
        console.log("send to ", queueName);

        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
}

function UpdateApis(filename, owner, data, id) {
  data._id = id;

  return Promise.all([
    sendFiles(id, owner, filename),
    PublisDiagram(data, owner),
    Charge(owner),
  ]);
}
module.exports = { UpdateApis };
