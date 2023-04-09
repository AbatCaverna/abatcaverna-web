import API from './API'

type Checkout = {
  price: string,
  quantity: number
}

interface CheckoutBody {
  email: string
  line_items: Array<Checkout>
}

const CheckoutService = {

  async createCheckoutSession(priceId: string, email: string) {
    const payload: CheckoutBody = {
      email,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ]
    }
    return await API.post('/checkout', payload) 
  },

  async createCartCheckoutSession(payload: CheckoutBody) {
    return await API.post('/checkout', payload) 
  }

}

export default CheckoutService
