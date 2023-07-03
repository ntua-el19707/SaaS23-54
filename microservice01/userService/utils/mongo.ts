import { MongoClient, Collection, Document } from "mongodb";

import { user } from "./interfaces/user";
import { PruduceGifts } from "./interfaces/ProducerGifts";
import { generateRandomString } from "./genarateRandomString";

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
  db: "Users",
  collection: "users",
};
/**
 * logIn - log a user into the system
 * @param userName string
 * @returns
 */
function logIn(userName: string): Promise<user | null> {
  return new Promise((resolve, reject) => {
    FindUser(userName)
      .then((user) => {
        if (user === null) {
          resolve(null);
        } else {
          console.log(user.LastLogin);
          LogUser(user)
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
                    } else {
                      const client = u as user;
                      resolve(client);
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
  console.log(process.env.mongo_url)
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
 * InserteUser - insert a new  user to db
 * @param userName:string
 * @returns
 */
//? there is need to  check if  a user exist because it already happen in LogIn() function which is the one tha is actually exported
function InserteUser(userName: string): Promise<any> {
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

          const LastLogin = Date();

          const user: user = {
            user_id: generateRandomString(10),
            userName: userName,
            LastLogin: [LastLogin],
            role: "client",
            credits: 10,
            total: 0,
          };

          userCollection
            .insertOne(user)
            .then((result) => {
              console.log("here");
              closeconection(connectionClient)
                .then(() => {})
                .catch((err) => {})
                .finally(() => {
                  console.log(result);
                  console.log(`User with username ${userName} inserted`);
                  FindUser(userName)
                    .then(async (u) => {
                      if (u !== null) {
                        let us = u as user;
                        await PruduceGifts(
                          us.user_id,
                          "Registarion Gift",
                          10,
                          "RegistrationPacket"
                        );
                        resolve(us);
                      } else {
                        resolve(u);
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
 * LogUser - user already exist update his last login
 * @param userName:string
 * @returns
 */
async function LogUser(client: user): Promise<user> {
  return new Promise((resolve, reject) => {
    const connectionClient = StartConection();
    if (connectionClient === false) {
      reject("there is no URL for atlas");
    } else {
      if (typeof connectionClient !== "boolean") {
        connection(connectionClient)
          .then(() => {
            const LastLogin: string = Date();

            console.log(client.LastLogin);
            const update = {
              LastLogin: [...client.LastLogin, LastLogin],
            }; //to hold all the login  i can simply  do
            console.log(update);
            //this  LastLogin = [client.LastLogin[client.LastClient.length -1 ] , LastLogin]
            const user = connectionClient
              .db(UserDatabaseANdColection.db)
              .collection(UserDatabaseANdColection.collection);
            user
              .findOneAndUpdate(
                { _id: client._id },
                { $set: update },
                { returnDocument: "after" }
              )
              .then((updatedUser) => {
                closeconection(connectionClient).then((rsp) => {
                  const user = updatedUser.value as user;
                  resolve(user);
                });
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
 * Register - register  a user in DB
 * @param userName string
 * @returns
 */
function Register(userName: string) {
  return new Promise((resolve, reject) => {
    InserteUser(userName)
      .then((u) => {
        resolve(u);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * chargeOrGive - charger  a user -1  credits
 * @params user_id
 * @returns Promise
 */
function chargeOrGive(
  user_id: string,
  credits: number,
  totalInc: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const connectionClient = StartConection();
    if (typeof connectionClient === "boolean") {
      reject("failed to create a connection");
    } else {
      connection(connectionClient)
        .then(() => {
          // Document filter criteria
          const filter = { user_id };
          // Update operation
          const decreaseBy = credits;

          const update = { $inc: { credits: decreaseBy, total: totalInc } };

          const collection: Collection<Document> = connectionClient
            .db(UserDatabaseANdColection.db)
            .collection(UserDatabaseANdColection.collection);
          collection
            .updateOne(filter, update)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {});
    }
  });
}
function FindUserByUser_id(user_id: string): Promise<user> {
  return new Promise((resolve, reject) => {
    const mongoConnection = StartConection();
    if (typeof mongoConnection === "boolean") {
      reject("Not able to create a connetion");
    } else {
      connection(mongoConnection)
        .then(() => {
          const Usercollection: Collection<Document> = mongoConnection
            .db(UserDatabaseANdColection.db)
            .collection(UserDatabaseANdColection.collection);
          Usercollection.findOne({
            user_id: user_id,
          }).then((user) => {
            console.log(user);
            if (user === null) {
              reject("Not Such user in db");
            } else {
              try {
                const client = user as user;
                resolve(client);
              } catch (err) {
                reject(err);
              }
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

/**
 * DB_collection - get mongo collection document
 * @param conn MongoClient
 * @param collection  string name of collectiomn
 * @returns
 */
function DB_collection(conn: MongoClient): Collection<Document> {
  const collection_db = conn
    .db(UserDatabaseANdColection.db)
    .collection(UserDatabaseANdColection.db);
  return collection_db;
}
export { logIn, FindUser, Register, chargeOrGive, FindUserByUser_id };
