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
        console.log("here");
        const messageHeaders = {
          FleInfo: JSON.stringify(filInfo),
        };
        channel.sendToQueue(queueName, streamContent, {
          headers: messageHeaders,
          persistent: true,
        });
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
function sendFiles(chart_id, owner, fileName) {
  // Get the channel names from environment variables
  const htmlChannel = process.env.HTMLCHANNEL;
  const svgChannel = process.env.SVGCHANNEL;
  const pdfChannel = process.env.PDFCHANNEL;
  const pngChannel = process.env.PNGCHANNEL;

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
  if (htmlChannel) {
    promises.push(sendFile(HtmlPath, FileInfo, htmlChannel));
  }

  // Send SVG file if the channel is defined
  if (svgChannel) {
    promises.push(sendFile(SvgPath, FileInfo, svgChannel));
  }

  // Send PDF file if the channel is defined
  if (pdfChannel) {
    promises.push(sendFile(PdfPath, FileInfo, pdfChannel));
  }

  // Send PNG file if the channel is defined
  if (pngChannel) {
    promises.push(sendFile(PngPath, FileInfo, pngChannel));
  }

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
module.exports = { sendFiles };
