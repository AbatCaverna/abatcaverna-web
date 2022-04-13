import UserRepository from '../Repository/UserRepository'
import { Role } from '../../src/utils/enum';
import jwt from 'jsonwebtoken';
import returnHashString from '../Utils/crypto';
import Stripe from '../Providers/stripe';

const privateKey = process.env.NEXTAUTH_SECRET
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
        const stripe_customer = await Stripe.customers.create({
          email: email
        })

        await this._userRepository.createUser(name, email, image, stripe_customer.id)
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
      
      if (returnHashString(password) !== morador.senha) return null;

      if (privateKey === undefined) {
        console.error(`Error[SERVER](${new Date().toDateString()}): Must provide a NEXTAUTH_SECRET env var`)
        return null
      };

      const jwt_token = jwt.sign(morador, privateKey, {
        expiresIn: 60 * 60 * 24 * 30, // 30 dias
        algorithm: 'HS512'
      });
      
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