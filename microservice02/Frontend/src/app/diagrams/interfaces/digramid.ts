export interface diagramFromMongoLight {
  _id: string;

  createAt: Date;
  name: string;
  type: string;
  data?: any;
}
