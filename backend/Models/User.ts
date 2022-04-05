import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public name?: string,
    public email?: string,
    public image?: string,
    public _id?: ObjectId,
  ) {}
}