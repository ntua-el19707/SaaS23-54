const amqp = require("amqplib");
const fs = require("fs");
function sendFile(filePath, queueName, filInfo) {
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
        console.log(`Send  to ${queueName}`);

        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
}
function sendCSVFile(fileName, type) {
  // Get the channel names from environment variables
  const CSVChannel = getChannel(type);

  // Define the file paths for each file type
  const CSVPath = `utils/Files/CSV/${fileName}`;

  // Array to store promises for each file upload
  let promises = [];
  let fileinfo = {
    filename: fileName,
  };
  // Send CSV file if the channel is defined
  if (CSVChannel) {
    promises.push(sendFile(CSVPath, CSVChannel, fileinfo));
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

/**
 * getChannel - get the channel
 * @param {*} type string
 * @returns string 'the channel that RAbbit MQ use for communication '
 */
function getChannel(type) {
  //define channel as  null  by default
  let channel = null;
  //find type  o chart to assing the right  channel
  switch (type) {
    case "line":
      channel = process.env.LINECHANNEL;
      break;
    case "network":
      channel = process.env.NETWORKQUEUE;
      break;
    case "pollar":
      channel = process.env.POLLARQUEUE;
      break;
    case "dependency_wheel":
      channel = process.env.DEPENDANCYQUEUE;
      break;
    case "line_anotation":
      channel = process.env.LINEANNOTATIONQUEUE;
      break;
    case "collumn":
      channel = process.env.COLLUMNQUEU;
      break;
    default:
      channel = null;
      break;
  }
  return channel;
}
module.exports = { sendCSVFile };
