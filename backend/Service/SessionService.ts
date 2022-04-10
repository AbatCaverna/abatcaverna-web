import UserRepository from '../Repository/UserRepository'
import { Role } from '../../src/utils/enum';
import jwt from 'jsonwebtoken';

const privateKey = 'private key'
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

  public async morador(name: string, password: string) {
    try {
      const morador = await this._userRepository.getMorador(name)
      
      if (!morador) return null;
      
      if (password !== morador.senha) return null;

      const jwt_token = jwt.sign(morador, privateKey, { algorithm: 'RS256' });
      
      return {
        ...morador,
        role: Role.cavernoso,
        token: jwt_token
      }
    } catch (error) {
      return null
    }
  }
}