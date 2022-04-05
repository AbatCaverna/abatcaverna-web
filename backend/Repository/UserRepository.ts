import { Db } from "mongodb";
import User from "../Models/User";

export default class MoradoresRepository {
  private _database: Db

  constructor(database: Db) {
    this._database = database;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const [user] = (await this._database
      .collection("users")
      .find({ email })
      .toArray()) as User[];
    return user;
  }

  public async createUser(name?: string, email?: string, image?: string): Promise<void> {
    const newUser = new User(name, email, image);

    await this._database
      .collection("users")
      .insertOne(newUser)
  }

}
