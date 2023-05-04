import { MongoClient, MongoClientOptions } from "mongodb";
import {
  buildLineOptions,
  buildPollarOptions,
  buildnetworkOptions,
} from "./buildFunctions/dataBuild";
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const dbURI: string =
  "mongodb+srv://vicgianndev0601:NC3Hv5LDHHoDpW5b@cluster0.ivrrqtw.mongodb.net/?retryWrites=true&w=majority";
interface DB {
  db: string;
  collection: string;
}
function FindCharts(owner: string) {
  return new Promise((resolve, reject) => {
    let DB_array: DB[] = [
      { db: "Lines", collection: "ChartLine" },
      { db: "network", collection: "chartnetwork" },
      { db: "Pollar", collection: "chartPollar" },
    ];
    const promises = DB_array.map((DB) => FindChart(owner, DB));

    Promise.all(promises)
      .then((rsp: any[]) => {
        //console.log(rsp);
        let charts: any[] = [];
        rsp.forEach((ar: any[]) => {
          //   console.log(ar);
          charts = [...charts, ...ar[0]];
        });
        const sortedArray = quickSortByCreateAt(charts);

        let respose: ChartRsp[] = [];
        sortedArray.forEach((s) => {
          let name = "";
          if (s.data) {
            if (s.data.title) {
              if (s.data.title.text) name = s.data.title.text;
            }
          }

          respose.push({
            name: name,
            CreatedAt: s.createAt,
            Download: s._id,
            Preview: s._id,
            Type: findType(s._id),
          });
        });
        console.log(respose);
        resolve(rsp);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

function FindChart(owner: string, DB: DB) {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(dbURI, options);
    const charts = client.db(DB.db).collection(DB.collection);
    let fetch = new Promise((resolve, reject) => {
      //console.log(owner);
      charts
        .find({ owner: owner })
        .toArray()
        .then(async (files) => {
          //   console.log(files);
          resolve(files);
        })
        .catch(async (err) => {
          reject(err);
        });
    });
    Promise.all([fetch])
      .then(async (file) => {
        await client.close();
        //console.log(file);
        resolve(file);
      })
      .catch(async (err) => {
        console.log(err);
        await client.close();
        resolve([]); //i do not want all fail appart send only
      });
  });
}

function quickSortByCreateAt(
  arr: any[],
  left = 0,
  right = arr.length - 1
): any[] {
  if (arr.length > 1) {
    const pivotIndex = partition(arr, left, right);
    if (left < pivotIndex - 1) {
      quickSortByCreateAt(arr, left, pivotIndex - 1);
    }
    if (pivotIndex < right) {
      quickSortByCreateAt(arr, pivotIndex, right);
    }
  }
  return arr;
}

function partition(arr: any[], left: number, right: number): number {
  const pivot = arr[Math.floor((left + right) / 2)].createAt;
  let i = left;
  let j = right;
  while (i <= j) {
    while (arr[i].createAt > pivot) {
      i++;
    }
    while (arr[j].createAt < pivot) {
      j--;
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  return i;
}
interface ChartRsp {
  Type: string;
  name: string;
  CreatedAt: string;
  Download: string;
  Preview: string;
}
function findType(id: string): string {
  let type = "";

  const size = id.length;

  switch (size) {
    case 5:
      //line  anottation
      type = "line anotattion";
      break;
    case 6:
      //for collum
      type = "collunm";
      break;
    case 7:
      type = "lines";
      break;
    case 8:
      type = "network";

      break;
    case 9:
      type = "Pollar";

      break;
    case 10:
      type = "DependancyWheel";

      break;
    default:
      break;
  }
  return type;
}
function BuildData(id: string, data: any) {
  let data_rsp: any;
  const size = id.length;

  switch (size) {
    case 5:
      //line  anottation

      break;
    case 6:
      //for collum

      break;
    case 7:
      //for  lines
      data_rsp = buildLineOptions(data);
      break;
    case 8:
      //for  network
      data_rsp = buildnetworkOptions(data, true);
      break;
    case 9:
      //for  pollar
      data_rsp = buildPollarOptions(data);
      break;
    case 10:
      //for  dependency wheel

      break;
    default:
      break;
  }
  return data_rsp;
}
function reaturnDB(id: string): { db: string; collection: string } {
  const size = id.length;
  let db: { db: string; collection: string } = { db: "", collection: "" };
  switch (size) {
    case 5:
      //line  anottation
      break;
    case 6:
      //for collum
      break;
    case 7:
      db = {
        db: "Lines",
        collection: "ChartLine",
      };
      break;
    case 8:
      db = {
        db: "network",
        collection: "chartnetwork",
      };

      break;
    case 9:
      db = {
        db: "Pollar",
        collection: "chartPollar",
      };
      break;
    case 10:
      db = {
        db: "DependancyWheel",
        collection: "chartDependancyWheel",
      };
      break;
    default:
      break;
  }
  return db;
}
function findSpecific(id: any) {
  return new Promise(async (resolve, reject) => {
    const DB: { db: string; collection: string } = reaturnDB(id);
    const client = new MongoClient(dbURI, options);
    const charts = client.db(DB.db).collection(DB.collection);
    let chart: any;
    try {
      chart = await charts.findOne({ _id: id });
    } catch (err) {
      await client.close();
      reject(err);
    } finally {
      await client.close();
      resolve(BuildData(id, chart.data));
    }
  });
}
export { FindCharts, findSpecific };
