import { MongoClient, MongoClientOptions, ObjectId } from "mongodb";
import { packet } from "./interfaces/packet";
import { generateRandomString } from "./genarateRandomString";
import { purchasedChart, purchasedPacket } from "./interfaces/Purchsased";
import { user } from "./interfaces/user";

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
  collection: "users",
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
 * logIn - log a user into the system
 * @param userName string
 * @returns
 */
function logIn(userName: string) {
  return new Promise((resolve, reject) => {
    FindUser(userName)
      .then((user) => {
        if (user === null) {
          InserteUser(userName)
            .then((u) => {
              console.log(u);
              resolve(u);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          LogUser(userName)
            .then((u) => {
              console.log(u);
              resolve(u);
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
 * FindUser - find a user in db
 * @param userName:string
 * @returns
 */
function FindUser(userName: string): Promise<user | null> {
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
              .findOne({ userName })
              .then((u) => {
                closeconection(connectionUsers)
                  .then(() => {})
                  .catch((err) => {})
                  .finally(() => {
                    if (u === null) {
                      resolve(null);
                    }
                    resolve(userInterfaceTrick(u));
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
 * @param userName:string
 * @returns
 */
//? there is need to  check if  a user exist because it already happen in LogIn() function which is the one tha is actually exported
async function InserteUser(userName: string): Promise<any> {
  try {
    const connectionClient = StartConection();
    if (connectionClient === false) {
      throw new Error("there is no url for atlas");
    } else {
      if (typeof connectionClient !== "boolean") {
        const client = connectionClient.db(UserDatabaseANdColection.db);
        const userCollection = client.collection(
          UserDatabaseANdColection.collection
        );
        const LastLogin = Date();

        const user = {
          userName: userName,
          LastLogin,
          role: "client",
          credits: 3,
        };
        const result = await userCollection.insertOne(user);
        await closeconection(connectionClient);
        console.log(`User with username ${userName} inserted`);
        return result;
      } else {
        throw new Error("no connection with atlas");
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
/**
 * LogUser - user already exist update his last login
 * @param userName:string
 * @returns
 */
async function LogUser(userName: string) {
  return new Promise((resolve, reject) => {
    const connectionClient = StartConection();
    if (connectionClient === false) {
      reject("there is no URL for atlas");
    } else {
      if (typeof connectionClient !== "boolean") {
        connection(connectionClient).then(() => {
          const LastLogin = Date();
          const user = connectionClient
            .db(UserDatabaseANdColection.db)
            .collection(UserDatabaseANdColection.collection);
          user
            .findOneAndUpdate({ userName: userName }, { $set: { LastLogin } })
            .then((updatedUser) => {
              closeconection(connectionClient).then((rsp) => {
                resolve(updatedUser.value);
              });
            });
        });
      }
    }
  });
}
/**
 * Purchase - `purchase a plan ` this will be exported
 * @param userName string
 * @param RequestedPacket packet
 * @param Payment any temporary
 * @returns
 */
function Purchase(userName: string, RequestedPacket: packet, Payment: any) {
  return new Promise((resolve, reject) => {
    const AvailablePackage = getAvailplePackets();
    FindUser(userName)
      .then((user) => {
        if (user === null) {
          reject("Not such a user in  DB");
        }
        if (!AvailablePackage.includes(RequestedPacket)) {
          reject("We do not provide the Requested Packet");
        }
        //TODO later
        //check Pyament and do payment

        //if all go well  i will be  waiting  a transaction_id ;
        const transaction_id: string = generateRandomString(16);
        const timestamp = Date();
        const purchased: purchasedPacket = {
          transaction_id: transaction_id,
          client: userName,
          charge: true,
          packet: RequestedPacket,
          date_of_transaction: timestamp,
        };
        const user_record: user = userInterfaceTrick(user);
        InsertPurchasedPacket(purchased, user_record)
          .then((packet_user_record) => {
            //TODO later
            //check Pyament and do payment if faild delete recort or att a field failed Purchaed and remove the credits
          })
          .catch((err) => {
            reject(err);
          });
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
function InsertPurchasedPacket(packet: purchasedPacket, user: user) {
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
            users.findOneAndUpdate({ _id: user._id }, update),
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
 * userInterfaceTrick - beause i did not use moongoose and i used mongodb i need a trick to set the type of the response  from users collection
 * @param user any
 * @returns user
 */
function userInterfaceTrick(user: any): user {
  let userL: user = {
    _id: new ObjectId(),
    userName: "",
    credits: 0,
    LastLogin: "",
    role: "",
  };
  if (user._id) {
    userL._id = user._id;
  } else {
    throw new Error("there is no _id");
  }
  if (user.userName) {
    userL.userName = user.userName;
  }
  if (user.credits !== undefined) {
    userL.credits = user.credits;
  }
  if (user.LastLogin) {
    userL.LastLogin = user.LastLogin;
  }
  if (user.role) {
    userL.role = user.role;
  }
  return userL;
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
 * purchasedChartFunction - purchase a chart this will be exported
 * @param chart_id string
 * @param userName userName
 * @returns
 */
function purchasedChartFunction(chart_id: string, userName: string) {
  return new Promise((resolve, reject) => {
    FindUser(userName)
      .then((u) => {
        if (u === null) {
          reject("Not such a user in  DB");
        }
        try {
          const user: user = userInterfaceTrick(u);
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
function insertPurchasedChart(chart_id: string, user: user) {
  return new Promise((resolve, reject) => {
    const timestamp: string = Date();
    const update = { credits: user.credits - 1 };
    const purchased_Chart: purchasedChart = {
      chart_id: chart_id,
      client: user.userName,
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
            users_collection.findOneAndUpdate({ _id: user._id }, update),
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
export {
  logIn,
  FindUser,
  purchasedChartFunction,
  Purchase,
  getAvailplePackets,
};
