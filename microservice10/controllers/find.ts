import { FindPreview } from "../lib/findAnfBuild";
import { AuthRequest } from "../lib/interfaces/Request";
import { diagrams } from "../lib/interfaces/responcesFunctions";

import { findMyDiagrams } from "../lib/mongo";
import { Response, NextFunction } from "express";
//i will make  it post user my  have  many diagrams
const find = (req: AuthRequest, res: Response, next: NextFunction) => {
  const owner = req.sub;
  if (owner) {
    findMyDiagrams(owner)
      .then((myCharts: diagrams[]) => {
        const charts: diagrams[] = quickSortByCreateAt(myCharts);
        res.status(200).json({ charts });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else {
    res.status(401).json({ err: "Access denied" });
  }
};
function quickSortByCreateAt(
  records: diagrams[],
  left: number = 0,
  right: number = records.length - 1
): diagrams[] {
  if (left >= right) {
    return records;
  }

  // Partition the array using the last element as the pivot
  const pivotIndex = right;
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (records[j].createAT > records[pivotIndex].createAT) {
      i++;
      [records[i], records[j]] = [records[j], records[i]];
    }
  }
  [records[i + 1], records[pivotIndex]] = [records[pivotIndex], records[i + 1]];

  // Recursively sort the left and right partitions
  quickSortByCreateAt(records, left, i);
  quickSortByCreateAt(records, i + 2, right);

  return records;
}
const findSpec = (req: AuthRequest, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  FindPreview(id)
    .then((chart) => {
      res.status(200).json({ chart });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
export { find, findSpec };
