import Stripe from 'stripe'

export default class ProdutosRepository {
  private _stripe: Stripe

  constructor(stripe: Stripe) {
    this._stripe = stripe
  }

  public async getAllProducts() {
    const prices = await this._stripe.prices.list({
      limit: 10,
    });


    const products = []

    for (const price of prices.data) {
      const product = await this._stripe.products.retrieve(
        price.product.toString()
      );

      if(product.active === false) continue

      products.push({
        product,
        price
      })
    }

    return products
  }

  public async createProduct(name: string, value: number, description?: string) {
    const product_created = await this._stripe.products.create({
      name,
      description
    });

    const price = await this._stripe.prices.create({
      unit_amount: value,
      currency: 'brl',
      product: product_created.id,
    });

    return {
      product: product_created,
      price
    } 
  }
}