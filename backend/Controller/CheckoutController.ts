import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Stripe from "stripe";
import User from "../Models/User";
import UserRepository from "../Repository/UserRepository";

type Checkout = {
  price: string,
  quantity: number
}

interface CheckoutBody {
  email: string
  line_items: Array<Checkout>
}

export default class CheckoutController {
  private _userRepository: UserRepository;
  private _stripe: Stripe

  constructor(userRepository: UserRepository, stripe: Stripe) {
    this._userRepository = userRepository;
    this._stripe = stripe;
  }
  public async index(req: NextApiRequest, res:NextApiResponse) {

    const { email, line_items } = req.body as CheckoutBody

    const userFound = await this._userRepository.getUserByEmail(email)

    if (!userFound) return res.status(404).send("User does not exist")

    if (!userFound.stripe_customer_id) {
      console.log('[SERVER]: User does not exist in stripe, creating id..')
      const stripeCustomer = await this._stripe.customers.create({
        name: userFound.name,
        email: userFound.email,
      })

      const user = new User(stripeCustomer.id, userFound.name, userFound.email, userFound.image)

      await this._userRepository.update(user)

      if (!line_items) return res.status(400).send("Must send data with array of line items")

      const stripeCheckoutSession = await this._stripe.checkout.sessions.create({
        customer: user.stripe_customer_id,
        line_items,
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/loja/checkout-sucesso`,
        cancel_url: `${req.headers.origin}/loja/checkout-erro`,
      })

      console.log('[SERVER]: Stripe checkout session created for user', user)
  
      return res.status(200).json({sessionId: stripeCheckoutSession.id})
    } else {

      if (!line_items) return res.status(400).send("Must send data with array of line items")

      const stripeCheckoutSession = await this._stripe.checkout.sessions.create({
        customer: userFound.stripe_customer_id,
        line_items,
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/loja/checkout-sucesso`,
        cancel_url: `${req.headers.origin}/loja/checkout-erro`,
      })

      console.log('[SERVER]: Stripe checkout session created for user', userFound)
  
      return res.status(200).json({sessionId: stripeCheckoutSession.id})

    }

  }
  async getSession(req: NextApiRequest, res:NextApiResponse) {
    const { sessionId } = req.query

    try {
      const session = await this._stripe.checkout.sessions.retrieve(
        sessionId as string
      );
  
      res.status(200).json({ session })
    } catch (error) {
      res.status(500).json({ message: "Erro!", error })
    }


  }
}