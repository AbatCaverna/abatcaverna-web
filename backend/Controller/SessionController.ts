import { Db } from 'mongodb';
import UserRepository from '../Repository/UserRepository'
import SessionService from '../Service/SessionService'
type User = {
  name?: string | undefined,
  email?: string| undefined,
  image?: string | undefined
}
export default class SessionController {
  private sessionService: SessionService

  constructor(db: Db) {
    const repository = new UserRepository(db);
    this.sessionService = new SessionService(repository)
  }
  
  public async index({ name, email, image}: User) {

    const response = await this.sessionService.createUserIfNotInDb(name, email, image)
    
    return response
  }

  public async moradorSession(name: string, password: string) {

    const response = await this.sessionService.morador(name, password)

    return response
  }
}