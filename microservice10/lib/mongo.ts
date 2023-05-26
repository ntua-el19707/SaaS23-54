import { Collection, MongoClient, Document, InsertOneResult } from "mongodb";
import { ChartRecord } from "./interfaces/sechema";
import { diagrams } from "./interfaces/responcesFunctions";

const DB: string = "PurchasedCharts";
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const LineCollection: string = "Lines";
const NetworkCollection: string = "Netwotk";
const PollarCollection: string = "Pollar";
const ColumnCollection: string = "Collumn";
const DependancyWheelCollection: string = "Dependancy_Wheel ";
const lineannotioncol: string = "Line_Annotations";
/**
 *
 * @param owner string  id 'id  random genarated  by mongo //* Not  email '
 */
export function findMyDiagrams(owner: string): Promise<diagrams[]> {
  return new Promise(async (resolve, reject) => {
    const conn: MongoClient | boolean = StartConection();
    if (typeof conn === "boolean") {
      reject("failed to create a client for mongo db");
    } else {
      connection(conn)
        .then(() => {
          const lineCollection: Collection<Document> = DB_collection(
            conn,
            LineCollection
          );
          const networkCollection: Collection<Document> = DB_collection(
            conn,
            NetworkCollection
          );
          const pollarCollection: Collection<Document> = DB_collection(
            conn,
            PollarCollection
          );
          const CollumnCollection: Collection<Document> = DB_collection(
            conn,
            ColumnCollection
          );
          const dependecycollection: Collection<Document> = DB_collection(
            conn,
            DependancyWheelCollection
          );
          const annotationscollection: Collection<Document> = DB_collection(
            conn,
            lineannotioncol
          );
          const lineCharts = lineCollection
            .find({
              ownerShip: owner,
            })
            .toArray();

          const networkCharts = networkCollection
            .find({
              ownerShip: owner,
            })
            .toArray();

          const pollarCharts = pollarCollection
            .find({
              ownerShip: owner,
            })
            .toArray();
          const CollumnCharts = CollumnCollection.find({
            ownerShip: owner,
          }).toArray();
          const dependencyCharts = dependecycollection
            .find({
              ownerShip: owner,
            })
            .toArray();
          const annotationsCharts = annotationscollection
            .find({
              ownerShip: owner,
            })
            .toArray();
          Promise.all([
            lineCharts,
            networkCharts,
            pollarCharts,
            CollumnCharts,
            dependencyCharts,
            annotationsCharts,
          ])
            .then((chartsArray) => {
              console.log(chartsArray);

              let charts: diagrams[] = [];
              chartsArray.forEach((charray: any) => {
                let list = charray as ChartRecord[];
                list.forEach((item) => {
                  console.log(`typr: ${findType(item.chart._id)}`);
                  charts.push({
                    _id: item.chart._id,
                    name: item.chart.title.text,
                    createAT: item.createAT,
                    Type: findType(item.chart._id),
                  });
                });
              });

              closeconection(conn)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(charts);
                });
            })
            .catch((err) => {
              closeconection(conn)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
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
export function insertLineChart(
  chart: ChartRecord
): Promise<InsertOneResult<Document>> {
  return new Promise((resolve, reject) => {
    const chartR: ChartRecord = chart;
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create  a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const lineCollection: Collection<Document> = DB_collection(
            mongoConnection,
            LineCollection
          );

          lineCollection
            .insertOne(chartR)
            .then((registerChart: InsertOneResult<Document>) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(registerChart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
export function insertCollunChart(
  chart: ChartRecord
): Promise<InsertOneResult<Document>> {
  return new Promise((resolve, reject) => {
    const chartR: ChartRecord = chart;
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create  a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const CollumnCollection: Collection<Document> = DB_collection(
            mongoConnection,
            ColumnCollection
          );

          CollumnCollection.insertOne(chartR)
            .then((registerChart: InsertOneResult<Document>) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(registerChart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
export function insertPollarChart(
  chartR: ChartRecord
): Promise<InsertOneResult<Document>> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create  a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const pollarCollection: Collection<Document> = DB_collection(
            mongoConnection,
            PollarCollection
          );

          pollarCollection
            .insertOne(chartR)
            .then((registerChart: InsertOneResult<Document>) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(registerChart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
export function insertNetworkChart(
  chartR: ChartRecord
): Promise<InsertOneResult<Document>> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const networkCollection: Collection<Document> = DB_collection(
            mongoConnection,
            NetworkCollection
          );

          networkCollection
            .insertOne(chartR)
            .then((registerChart: InsertOneResult<Document>) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(registerChart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
export function findLine(id: string): Promise<ChartRecord> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const Linecollection: Collection<Document> = DB_collection(
            mongoConnection,
            LineCollection
          );

          Linecollection.findOne({ "chart._id": id })
            .then((data: any) => {
              const chart = data as ChartRecord;
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(chart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
export function findNetwork(id: string): Promise<ChartRecord> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    console.log(`Looking  for  Network diagram ${id}`);
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const Networkcollection: Collection<Document> = DB_collection(
            mongoConnection,
            NetworkCollection
          );

          Networkcollection.findOne({ "chart._id": id })
            .then((data: any) => {
              const chart = data as ChartRecord;
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(chart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
export function findPollar(id: string): Promise<ChartRecord> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const Pollarcollection: Collection<Document> = DB_collection(
            mongoConnection,
            PollarCollection
          );

          Pollarcollection.findOne({ "chart._id": id })
            .then((data: any) => {
              const chart = data as ChartRecord;
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(chart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

export function findCollumn(id: string): Promise<ChartRecord> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const collcollection: Collection<Document> = DB_collection(
            mongoConnection,
            ColumnCollection
          );

          collcollection
            .findOne({ "chart._id": id })
            .then((data: any) => {
              const chart = data as ChartRecord;
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(chart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
export function insertCollumnChart(
  chartR: ChartRecord
): Promise<InsertOneResult<Document>> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const Collumnollection: Collection<Document> = DB_collection(
            mongoConnection,
            ColumnCollection
          );

          Collumnollection.insertOne(chartR)
            .then((registerChart: InsertOneResult<Document>) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(registerChart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
function findType(id: string) {
  let type: string = "";
  const size: number = id.length;
  switch (size) {
    case 7:
      type = "Line";

      break;
    case 8:
      type = "Network";

      break;
    case 9:
      type = "Pollar";

      break;
    case 10:
      type = "DependancyWheel";

      break;
    case 11:
      type = "Collumn";
      break;
    case 12:
      type = "Line anottations";
      break;
    default:
      break;
  }
  return type;
}
export function insertDependancyChart(
  chartR: ChartRecord
): Promise<InsertOneResult<Document>> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const DependancyWheeCollection: Collection<Document> = DB_collection(
            mongoConnection,
            DependancyWheelCollection
          );

          DependancyWheeCollection.insertOne(chartR)
            .then((registerChart: InsertOneResult<Document>) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(registerChart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

export function findDependancyChart(id: string): Promise<ChartRecord> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const Dependencycollection: Collection<Document> = DB_collection(
            mongoConnection,
            DependancyWheelCollection
          );

          Dependencycollection.findOne({ "chart._id": id })
            .then((data: any) => {
              const chart = data as ChartRecord;
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(chart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

export function insertChartLineAnnotion(
  chartR: ChartRecord
): Promise<InsertOneResult<Document>> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const collection: Collection<Document> = DB_collection(
            mongoConnection,
            lineannotioncol
          );
          collection
            .insertOne(chartR)
            .then((registerChart: InsertOneResult<Document>) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(registerChart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

export function findChartLineAnnotion(id: string): Promise<ChartRecord> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const collection: Collection<Document> = DB_collection(
            mongoConnection,
            lineannotioncol
          );
          collection
            .findOne({ "chart._id": id })
            .then((data: any) => {
              const chart = data as ChartRecord;
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(chart);
                });
            })
            .catch((err) => {
              closeconection(mongoConnection)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
