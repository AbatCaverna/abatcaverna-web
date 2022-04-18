import axios, { AxiosInstance } from 'axios';

export default class CheckoutService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://abatcaverna.app/api'
    })
  }

  async createCheckoutSession(priceId: string) {
    return await this.api.post('/checkout', { priceId }) 
  }

}