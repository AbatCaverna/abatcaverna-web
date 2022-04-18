import axios, { AxiosInstance } from 'axios';

type Checkout = {
  price: string,
  quantity: number
}

interface CheckoutBody {
  line_items: Array<Checkout>
}

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
    const payload: CheckoutBody = {
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ]
    }
    return await this.api.post('/checkout', payload) 
  }

  async createCartCheckoutSession(payload: CheckoutBody) {
    return await this.api.post('/checkout', payload) 
  }

}