import { Db } from "mongodb";
import User from "../Models/User";
import Morador from "../Models/Morador";

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

  public async createUser(name?: string, email?: string, image?: string, stripe_customer_id?: string): Promise<void> {
    const newUser = new User(name, email, image, stripe_customer_id);

    await this._database
      .collection("users")
      .insertOne(newUser)
  }

  public async getMorador(name: string) {
    const [morador] = await this._database
      .collection('moradores')
      .find({ apelido: name })
      .toArray() as Morador[]

    return morador
  }

  public async update(model: User) {
    await this._database.collection("users").updateOne({
      email: model.email,
    }, {
      $set: {
        name: model.name,
        stripe_customer_id: model.stripe_customer_id
      }
    })
  }

}
