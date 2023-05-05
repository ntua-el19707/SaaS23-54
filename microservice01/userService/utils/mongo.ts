import { MongoClient, MongoClientOptions } from "mongodb";

const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const dbURI: string | undefined = process.env.mongo_url;
interface DB {
  db: string;
  collection: string;
}
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

function FindUser(userName: string) {
  return new Promise((resolve, reject) => {
    if (process.env.mongo_url) {
      try {
        const client = new MongoClient(process.env.mongo_url, options);
        const userCollection = client.db("Clients").collection("users");
        userCollection
          .findOne({ userName: userName })
          .then((us) => {
            console.log(us);
            resolve(us);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    } else {
      reject("no uri");
    }
  });
}
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
async function connection(client: MongoClient): Promise<boolean> {
  try {
    await client.connect();
    console.log("There is a connection with Atlas");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function closeconection(client: MongoClient): Promise<boolean> {
  try {
    await client.close();
    return true;
  } catch (err) {
    return false;
  }
}
async function InserteUser(userName: string): Promise<any> {
  try {
    console.log("one");
    const connectionClient = StartConection();
    if (connectionClient === false) {
      throw new Error("there is no url for atlas");
    } else {
      if (typeof connectionClient !== "boolean") {
        const client = connectionClient.db("Clients");
        const userCollection = client.collection("users");
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
async function LogUser(userName: string) {
  return new Promise((resolve, reject) => {
    const connectionClient = StartConection();
    if (connectionClient === false) {
      reject("there is no URL for atlas");
    } else {
      if (typeof connectionClient !== "boolean") {
        connection(connectionClient).then((rsp) => {
          if (rsp === true) {
            const LastLogin = Date();
            const user = connectionClient.db("Clients").collection("users");
            user
              .findOneAndUpdate({ userName: userName }, { $set: { LastLogin } })
              .then((updatedUser) => {
                closeconection(connectionClient).then((rsp) => {
                  resolve(updatedUser.value);
                });
              });
          } else {
            reject("no connection with atlas");
          }
        });
      }
    }
  });
}
export { logIn };
