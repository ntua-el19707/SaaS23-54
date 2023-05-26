import { Collection, MongoClient, ObjectId, Document } from "mongodb";
import { downloadDocs } from "../interfaces/docs";
const DB: string = "Downloadpdf";
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
export function findChart(id: string): Promise<downloadDocs> {
  return new Promise((resolve, reject) => {
    const collection: string | null = findCollection(id);
    if (collection === null) {
      reject("The id is not valid");
    } else {
      const conn: MongoClient | boolean = StartConection();
      if (typeof conn === "boolean") {
        reject("faiiled  to create a client for mongo db");
      } else {
        connection(conn)
          .then(() => {
            const collection_doc: Collection<Document> = DB_collection(
              conn,
              collection
            );
            collection_doc
              .findOne({ chart_id: id })
              .then((chart: any | null) => {
                if (chart === null) {
                  reject(new NotSuchChartInpdf("this chart is  not in db"));
                } else {
                  const ch = chart as downloadDocs;
                  closeconection(conn)
                    .then(() => {})
                    .catch((err) => {})
                    .finally(() => {
                      resolve(ch);
                    });
                }
              });
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
  });
}

/**
 * findCollection -Function to return the database collection based on the length of the chart ID
 * @param id string
 */
function findCollection(id: string): string | null {
  let collection: string | null = null;
  const size: number = id.length;
  switch (size) {
    case 7:
      collection = "ChartLine";

      break;
    case 8:
      collection = "chartnetwork";

      break;
    case 9:
      collection = "chartPollar";

      break;
    case 10:
      collection = "chartDependancyWheel";

      break;
    case 11:
      collection = "chartCollumn";

      break;
    case 12:
      collection = "chartLineAnnotation";

      break;
    default:
      break;
  }
  return collection;
}
/**
 * StartConection() - starts a Mongo conrction if fails return false
 * @returns
 */
function StartConection(): MongoClient | boolean {
  if (process.env.mongo_url) {
    try {
      const client = new MongoClient(process.env.mongo_url, options);
      return client;
    } catch (err) {
      console.log(err);
    }
  }
  return false;
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
async function closeconection(client: MongoClient): Promise<void> {
  try {
    await client.close();
  } catch (err) {
    throw err;
  }
}
/**
 * DB_collection - get mongo collection document
 * @param conn MongoClient
 * @param collection  string name of collectiomn
 * @returns
 */
function DB_collection(
  conn: MongoClient,
  collection: string
): Collection<Document> {
  const collection_db = conn.db(DB).collection(collection);
  return collection_db;
}
export class NotSuchChartInpdf extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotSuchChartInpdf";
  }
}

export function insertChart(chart: downloadDocs): Promise<void> {
  return new Promise((resolve, reject) => {
    const collection: string | null = findCollection(chart.chart_id);
    if (collection === null) {
      reject("The chart_id is not valid");
    } else {
      const conn: MongoClient | boolean = StartConection();
      if (typeof conn === "boolean") {
        reject("Failed to create a client for MongoDB");
      } else {
        connection(conn)
          .then(() => {
            const collection_doc: Collection<Document> = DB_collection(
              conn,
              collection
            );
            collection_doc
              .insertOne(chart)
              .then(() => {
                closeconection(conn)
                  .then(() => {})
                  .catch((err) => {})
                  .finally(() => {
                    resolve();
                  });
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
  });
}
