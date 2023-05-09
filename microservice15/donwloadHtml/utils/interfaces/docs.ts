import { ObjectId } from "mongodb";

export interface downloadDocs {
  _id?: ObjectId;
  file: string;
  chart_id: string;
  ownerShip: string;
  timestamp: string;
}
