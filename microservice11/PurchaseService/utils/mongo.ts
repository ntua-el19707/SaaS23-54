import { MongoClient, InsertOneResult, Document, ObjectId } from "mongodb";
import { packet } from "./interfaces/packet";
import { generateRandomString } from "./genarateRandomString";
import { purchasedChart, purchasedPacket } from "./interfaces/Purchsased";
import { clients } from "./interfaces/user";

const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

interface DB {
  db: string;
  collection: string;
}
//The database and collection that this modules wiil acsess and modify
const UserDatabaseANdColection: DB = {
  db: "Clients",
  collection: "clients",
};
const UserDatabaseANdColectionPurchaseLog: DB = {
  db: "Clients",
  collection: "PurchaseLog",
};
const UserDatabaseANdColectionPurchaseChart: DB = {
  db: "Clients",
  collection: "PurchaseChart",
};

/**
 * FindUser - find a user in db
 * @param user_id:string
 * @returns
 */
function FindUser(user_id: string): Promise<clients | null> {
  return new Promise((resolve, reject) => {
    try {
      const connectionUsers = StartConection();
      if (typeof connectionUsers !== "boolean") {
        connection(connectionUsers)
          .then(() => {
            const users = connectionUsers
              .db(UserDatabaseANdColection.db)
              .collection(UserDatabaseANdColection.collection);
            users
              .findOne({ user_id: user_id })
              .then((u) => {
                const user = u as clients;
                closeconection(connectionUsers)
                  .then(() => {})
                  .catch((err) => {})
                  .finally(() => {
                    if (u === null) {
                      resolve(null);
                    } else {
                      resolve(user);
                    }
                  });
              })
              .catch((err) => {
                closeconection(connectionUsers)
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
      } else {
        reject("the is no conection");
      }
    } catch (err) {
      reject(err);
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
//TODO remove boolean and make it void  remove returns and fix all the functions
async function closeconection(client: MongoClient): Promise<boolean> {
  try {
    await client.close();
    return true;
  } catch (err) {
    return false;
  }
}
/**
 * InserteUser - insert a new  user to db
 * @param user_id:string
 * @returns
 */
//? there is need to  check if  a user exist because it already happen in LogIn() function which is the one tha is actually exported
function InserteUser(user_id: string): Promise<ObjectId> {
  return new Promise((resolve, reject) => {
    try {
      const connectionClient = StartConection();
      if (typeof connectionClient === "boolean") {
        reject("there is no url for atlas");
      } else {
        if (typeof connectionClient !== "boolean") {
          const userCollection = connectionClient
            .db(UserDatabaseANdColection.db)
            .collection(UserDatabaseANdColection.collection);
          const user = {
            user_id: user_id,
            credits: 0,
          };
          userCollection
            .findOne({ user_id: user.user_id })
            .then((u) => {
              if (u !== null) {
                reject("user already exist");
              } else {
                userCollection
                  .insertOne(user)
                  .then((result: InsertOneResult<Document>) => {
                    console.log("here");
                    closeconection(connectionClient)
                      .then(() => {})
                      .catch((err) => {})
                      .finally(() => {
                        console.log(result);
                        console.log(`User with user_id ${user_id} inserted`); //this  must bee done  by mesasging actually .

                        FindUser(user_id)
                          .then((u) => {
                            console.log("use r found " + u);
                            if (u !== null) {
                              gift(
                                u,
                                getAvailplePackets()[1],
                                "Registation gift"
                              )
                                .then(() => {
                                  resolve(result.insertedId);
                                })
                                .catch((err) => {
                                  resolve(result.insertedId);
                                });
                            } else {
                              reject("user not  found");
                            }
                          })
                          .catch((err) => {
                            reject(err);
                          });
                      });
                  })
                  .catch((err) => {
                    closeconection(connectionClient)
                      .then(() => {})
                      .catch((err) => {})
                      .finally(() => {
                        reject(err);
                      });
                  });
              }
            })
            .catch((err) => {
              closeconection(connectionClient)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  reject(err);
                });
            });
        } else {
          reject("no connection with atlas");
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

/**
 * Purchase - `purchase a plan ` this will be exported
 * @param user_id string
 * @param RequestedPacket packet
 * @param Payment any temporary
 * @returns
 */
function Purchase(user_id: string, RequestedPacket: packet, Payment: any) {
  return new Promise((resolve, reject) => {
    FindUser(user_id)
      .then((user: clients | null) => {
        if (user === null) {
          reject("Not such a user in  DB");
        } else if (!PlanExist(RequestedPacket)) {
          reject("We do not provide the Requested Packet");
        } else {
          //TODO later
          //check Pyament and do payment

          //if all go well  i will be  waiting  a transaction_id ;
          const transaction_id: string = generateRandomString(16);
          const timestamp = Date();
          const purchased: purchasedPacket = {
            transaction_id: transaction_id,
            client: user_id,
            charge: true,
            packet: RequestedPacket,
            date_of_transaction: timestamp,
          };
          const user_record: clients = user;
          InsertPurchasedPacket(purchased, user_record)
            .then((packet_user_record) => {
              //TODO later

              resolve(packet_user_record);
              //check Pyament and do payment if faild delete recort or att a field failed Purchaed and remove the credits
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * InsertPurchasedPacket - purchase a plan records at db
 * @param packet purchasedPacket
 * @param user user
 * @returns
 */
function InsertPurchasedPacket(packet: purchasedPacket, user: clients) {
  return new Promise((resolve, reject) => {
    const conectionClient = StartConection();
    if (typeof conectionClient === "boolean") {
      reject("No uri for db");
    } else {
      connection(conectionClient)
        .then(() => {
          const purchasedLog = conectionClient
            .db(UserDatabaseANdColectionPurchaseLog.db)
            .collection(UserDatabaseANdColectionPurchaseLog.collection);
          const users = conectionClient
            .db(UserDatabaseANdColection.db)
            .collection(UserDatabaseANdColection.collection);
          const update = {
            credits: user.credits + packet.packet.credits,
          };
          Promise.all([
            purchasedLog.insertOne(packet),
            users.findOneAndUpdate({ _id: user._id }, { $set: update }),
          ])
            .then((rsp) => {
              const packet_record = rsp[0];
              const user_record = rsp[1];
              const PromiseResponse = {
                packet_record,
                user_record,
              };
              //? if the connection does not happen the purchased has alraedy happen and register so that is why i do not reject promsie
              //it is  unlikly tha connecion will nor close in this point.
              closeconection(conectionClient)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  console.log("done");
                  resolve(PromiseResponse);
                });
            })
            .catch((err) => {
              closeconection(conectionClient)
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
 * getAvailplePackets() - this wll return the puckage that we are selling  this will be exported
 * @returns
 */
function getAvailplePackets(): packet[] {
  //TODO later add price
  const AvailabPackage: packet[] = [
    { name: "Basic", credits: 1 },
    { name: "Standard", credits: 3 },
    { name: "Premium", credits: 10 },
    { name: "Enterprise", credits: 100 },
  ];
  return AvailabPackage;
}
/**
 * PlanExist - check if apacket is available
 * @param p packet
 * @returns
 */
function PlanExist(p: packet): boolean {
  const plans = getAvailplePackets();
  let rsp = false;
  plans.forEach((pl) => {
    if (pl.name === p.name && p.credits === pl.credits) {
      rsp = true;
    }
  });
  return rsp;
}
/**
 * purchasedChartFunction - purchase a chart this will be exported
 * @param chart_id string
 * @param user_id user_id
 * @returns
 */
function purchasedChartFunction(chart_id: string, user_id: string) {
  return new Promise((resolve, reject) => {
    FindUser(user_id)
      .then((u) => {
        if (u === null) {
          reject("Not such a user in  DB");
        } else {
          try {
            const user: clients = u;
            console.log(user);
            insertPurchasedChart(chart_id, user)
              .then((rsp) => {
                resolve(rsp);
              })
              .catch((err) => {
                reject(err);
              });
          } catch (err) {
            reject(err);
          }
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * insertPurchasedChart  - insert purchase and charge client
 * @param chart_id string
 * @param user user
 * @returns
 */
function insertPurchasedChart(chart_id: string, user: clients) {
  return new Promise((resolve, reject) => {
    const timestamp: string = Date();
    const update = { credits: user.credits - 1 };
    const purchased_Chart: purchasedChart = {
      chart_id: chart_id,
      client: user.user_id,
      date_of_transaction: timestamp,
    };
    const conectionClient = StartConection();
    if (typeof conectionClient === "boolean") {
      reject("No uri for db");
    } else {
      connection(conectionClient)
        .then(() => {
          const users_collection = conectionClient
            .db(UserDatabaseANdColection.db)
            .collection(UserDatabaseANdColection.collection);
          const user_chart_collections = conectionClient
            .db(UserDatabaseANdColectionPurchaseChart.db)
            .collection(UserDatabaseANdColectionPurchaseChart.collection);
          Promise.all([
            users_collection.findOneAndUpdate(
              { _id: user._id },
              { $set: update }
            ),
            user_chart_collections.insertOne(purchased_Chart),
          ])
            .then((rsp) => {
              let response = {
                users: rsp[0],
                purchase: rsp[1],
              };
              //? if the connection does not happen the purchased has alraedy happen and register so that is why i do not reject promsie
              //it is  unlikly tha connecion will nor close in this point.
              closeconection(conectionClient)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  resolve(response);
                });
            })
            .catch((err) => {
              closeconection(conectionClient)
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
 * function gift - give gift credits to user sucha a refistation or  in "Future holiday gifts"
 * @param user user
 * @param packet  packet
 * @param comment  string
 * @returns
 */
function gift(user: clients, packet: packet, comment: string) {
  return new Promise((resolve, reject) => {
    const gift: purchasedPacket = {
      charge: false,
      transaction_id: generateRandomString(16),
      comment_if_gift: comment,
      packet: { name: "gift", credits: packet.credits },
      client: user.user_id,
      date_of_transaction: Date(),
    };
    InsertPurchasedPacket(gift, user)
      .then((rsp) => {
        resolve(rsp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export {
  FindUser,
  purchasedChartFunction,
  Purchase,
  getAvailplePackets,
  InserteUser,
};
