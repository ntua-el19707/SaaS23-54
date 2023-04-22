const dbURI =
  "mongodb+srv://vicgianndev0601:NC3Hv5LDHHoDpW5b@cluster0.ivrrqtw.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion } = require("mongodb");
const makeid = require("./genaratorString");
const client = new MongoClient(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
/**
 * insertChart 'insert a new chart in db'
 * @param {*} data //chart options
 * @param {*} user //chart owner
 * @returns
 */
function insertChart(data, user) {
  return new Promise((resolve, reject) => {
    _id = makeid(16);
    client
      .db("network")
      .collection("chartnetwork")
      .insertOne({ _id: _id, data, createAt: new Date(), owner: user })
      .then((rsp) => {
        console.log(rsp);
        resolve(rsp);
      });
  }).catch((err) => {
    console.log(err);
    resolve();
  });
}
/**
 * function readChart
 * @param {*} id
 * @returns options for chart
 */
function readChart(id) {
  return new Promise((resolve, reject) => {
    const charts = client.db("network").collection("chartnetwork");
    charts
      .findOne({ _id: id })
      .then((chart) => {
        console.log(id);
        console.log("one");
        console.log(chart);
        resolve(chart);
      })
      .catch((err) => {
        console.log(err);
        console.log("onw");
        reject(err);
      });
  });
}
/**
 * readDemo
 * @param {*} id //mongo id
 * @returns filename of demo.csv
 */
function readDemo(id) {
  return new Promise((resolve, reject) => {
    const demos = client.db("network").collection("ChartnetworkDemos");
    demos
      .findOne({ ObjectId: id })
      .then((file) => {
        resolve(file);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * readDemow
 *
 * @returns filenames [] of demo.csv
 */
function readDemos() {
  return new Promise((resolve, reject) => {
    const demos = client.db("network").collection("ChartnetworkDemos");
    demos
      .find()
      .toArray()
      .then((files) => {
        resolve(files);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * function FindMycharts
 * @param {*} owner
 * @returns charts of owner
 */
function FindMycharts(owner) {
  return new Promise(async (resolve, reject) => {
    try {
      const sort = { createAt: -1 };
      const charts = await client
        .db("network")
        .collection("chartnetwork")
        .find({ owner })
        .project({ _id: 1, owner: 0 })
        .sort(sort)
        .toArray();
      resolve(charts);
    } catch (err) {
      reject(err);
    }
  });
}
function insertDemos(file) {}
module.exports = { insertChart, readChart, readDemo, readDemos, FindMycharts };
