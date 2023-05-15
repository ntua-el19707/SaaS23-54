import { packet } from "./packet";

export interface purchasedPacket {
  transaction_id: string;
  date_of_transaction: string;
  packet: packet;
  client: string;
  charge: boolean; // if it the client reseave a gift(registetion) wich mean not paying  charge will be false
  comment_if_gift?: string; //if client  get  agift comment  to no will not be charged
}
export interface purchasedChart {
  chart_id: string;
  client: string;
  date_of_transaction: string;
}
