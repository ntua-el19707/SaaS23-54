import { ObjectId } from "mongodb";
export interface user {
  _id?: ObjectId;
  user_id: string;
  userName: string;
  credits: number;
  total: number;
  LastLogin: string[];
  role: string;
}
