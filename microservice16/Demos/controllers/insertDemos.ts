import { Request, Response } from "express";
import { writeFileSync } from "fs";
import { generateRandomString } from "../utils/lib/genarateRandomString";
import { insertDB } from "../utils/lib/mongo";
const master = (req: Request, res: Response) => {
  const name_size = 10;
  //TODO Complete Lines
  const fileLineDemo: string = generateRandomString(name_size) + ".csv";
  fileWriter(Line1, fileLineDemo);
  let insertLine1: Promise<void> = insertDB(1, fileLineDemo);

  Promise.all([insertLine1])
    .then(() => {
      res.json({ msg: "ok" });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

function fileWriter(csv, name) {
  writeFileSync(`/utils/Files/csv/${name}`, csv);
}
const Line1 = `title,,,
text,align,,
Path length vs map size of a random Maze  NxN,center,,
Xaxis,,,
text,align,,
N,center,,
Yaxis,,,
text,align,,
Length,right,,
series,,,
type,name,datax,datay
XY,A* algorythm,10,2508
,,20,6792
,,30,10588
,,40,15408
,,50,20056
,,60,22400
,,70,27332
,,80,30196
,,90,33688
,,100,37628
,,END,END
series,,,
type,name,datax,datay
XY,Best First algorythm,10,2536
,,20,7148
,,30,12192
,,40,17572
,,50,24800
,,60,27016
,,70,35048
,,80,39024
,,90,44500
,,100,48100
,,END,END
series,,,
type,name,datax,datay
XY,Dijkstras algorythm,10,2508
,,20,6792
,,30,10588
,,40,15408
,,50,20056
,,60,22400
,,70,27332
,,80,30196
,,90,33688
,,100,37628
,,END,END
`;
