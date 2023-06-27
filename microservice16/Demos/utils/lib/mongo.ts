import { MongoClient, InsertOneResult, Document, ObjectId } from "mongodb";
//mongodb+srv://stylch37:jS8zpR4Srq4pNdCI@cluster0.llslapy.mongodb.net/
//import { clients } from "./interfaces/user";
import { config } from "dotenv";
config();

const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

interface DB {
  db: string;
  collection: string;
}
//The database and collection that this modules wiil acsess and modify
const LineDemo: DB = {
  db: "DemoCharts",
  collection: "LineDemo",
};
const LinewithAnnotationsDemo: DB = {
  db: "DemoCharts",
  collection: "LinewithAnnotationsDemo",
};
const PolarDemo: DB = {
  db: "DemoCharts",
  collection: "PolarDemo",
};
const DependancyWheelDemo: DB = {
  db: "DemoCharts",
  collection: "DependancyWheelDemo",
};

const NetworkDemo: DB = {
  db: "DemoCharts",
  collection: "NetworkDemo",
};

const ColumnDemo: DB = {
  db: "DemoCharts",
  collection: "ColumnDemo",
};

/**
 * StartConection() - starts a Mongo conrction if fails return false
 * @returns
 */

function StartConnection(): MongoClient | boolean {
  if (process.env.mongo_url) {
    try {
      const client = new MongoClient(process.env.mongo_url, options);
      return client;
    } catch (err) {
      console.log(err);
    }
  } else {
    console.error("No URL for MongoDB found in environment variables.");
    return false;
  }
}
/**
 * connection - test if we can connect to db
 * @param client MongoClient
 */
async function connection(client: MongoClient): Promise<void> {
  try {
    await client.connect();
    console.log("There is a connection with Atlas");
  } catch (err) {
    console.log(err);
    throw err;
  }
}
/**
 * closeconection - cloase  a mongo connection
 * @param client MongoClient
 * @returns
 */
//TODO remove boolean and make it void  remove returns and fix all the functions
async function closeConnection(client: MongoClient): Promise<boolean> {
  try {
    await client.close();
    return true;
  } catch (err) {
    return false;
  }
}

//
async function insertDemo(  collectionName: string, filename: string  ): Promise<void> {
  const client = StartConnection();
  if (typeof client === "boolean") {
    throw new Error("No URL for DB");
  }

  try {
    await connection(client);
    const db = client.db("DemoCharts");
    const collection = db.collection(collectionName);
    //use filename given
    await collection.insertOne({ filename });
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
    throw err;
  } finally {
    await closeConnection(client);
  }
}
//

function findDemos(collectionName: string) {
  const collections: { [key: string]: DB } = {
    LineDemo,
    LinewithAnnotationsDemo,
    PolarDemo,
    DependancyWheelDemo,
    NetworkDemo,
    ColumnDemo,
  };

  const collection = collections[collectionName];
  if (!collection) {
    return Promise.reject("Invalid collection name");
  }

  return new Promise((resolve, reject) => {
    const connectionClient = StartConnection();
    if (typeof connectionClient === "boolean") {
      reject("No url for db");
    } else {
      connection(connectionClient)
        .then(() => {
          const db = connectionClient.db(collection.db);
          const col = db.collection(collection.collection);
          col
            .find({})
            .toArray()
            .then((results) => {
              const demos = results.map((entry) => entry.filename);
              resolve(demos);
            })
            .catch((err) => {
              reject(err);
            })
            .finally(() => {
              closeConnection(connectionClient);
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
/*
insertDemo("LinewithAnnotations", "file2")
  .then(() => {
    console.log("Data inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });
  */
function insertDB(num: number, file: string): Promise<void> {
  let db: string = "";
  switch (num) {
    case 1:
      db = LineDemo.collection;
      break;
    case 2:
      db = NetworkDemo.collection;
      break;
    case 3:
      db = PolarDemo.collection;
      break;
    case 4:
      db = DependancyWheelDemo.collection;
      break;
    case 5:
      db = ColumnDemo.collection;
      break;
    case 6:
      db = LinewithAnnotationsDemo.collection;
      break;
    default:
      throw new Error("this  is  not avlid choice");
  }
  return insertDemo(db, file);
}

export { StartConnection, connection, closeConnection, findDemos, insertDB };
