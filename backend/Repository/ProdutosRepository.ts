import { Db } from 'mongodb';
import Stripe from 'stripe'

export default class ProdutosRepository {
  private _stripe: Stripe
  private _database: Db

  constructor(stripe: Stripe, db: Db) {
    this._stripe = stripe
    this._database = db
  }

  public async getAllProducts(email?: string) {
    const prices = await this._stripe.prices.list({
      limit: 10,
    });

    let ja_comprou_ingresso = false

    if (email !== undefined) {
      const [compra] = (await this._database
        .collection("user_orders")
        .find({ user_email: email })
        .toArray()) as any[];

  
      if (compra) {
        for (const produto of compra.products) {
          if(produto.isIngresso) {
            ja_comprou_ingresso = true
          }
        }
      } 
      
    }

    const products = []

    for (const price of prices.data) {
      const product = await this._stripe.products.retrieve(
        price.product.toString()
      );

      if(price.active === false) continue;
      if(product.active === false) continue
      if(ja_comprou_ingresso && product.metadata.ingresso) continue

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