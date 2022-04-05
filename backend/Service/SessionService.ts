import UserRepository from '../Repository/UserRepository'

export default class MoradoresService {

  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async createUserIfNotInDb(name?: string, email?: string, image?: string) {
    try {
      if (!email) return false
      
      const user = await this._userRepository.getUserByEmail(email);

      if (!user) {
        await this._userRepository.createUser(name, email, image)
      }

      return true
    } catch (error) {
      return false
    }
  }
}