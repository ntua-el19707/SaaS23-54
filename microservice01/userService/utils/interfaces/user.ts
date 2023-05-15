import { ObjectId } from "mongodb";
export interface user {
  _id?: ObjectId;
  userName: string;
  credits: number;
  LastLogin: string[];
  role: string;
}
