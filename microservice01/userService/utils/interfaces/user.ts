import { ObjectId } from "mongodb";
export interface user {
  _id?: ObjectId;
  user_id: string;
  userName: string;
  credits: number;
  LastLogin: string[];
  role: string;
}
