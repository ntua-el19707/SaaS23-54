import { ObjectId } from "mongodb";

export interface user {
  _id?: ObjectId; //this will be used to refer user in all of  DBs  // * not the email
  userName: string;
  role: string;
  credits: number;
  login: string[];
}
