import { ObjectId } from "mongodb";
export interface clients {
  _id: ObjectId;
  user_id: string;
  credits: number;
}
