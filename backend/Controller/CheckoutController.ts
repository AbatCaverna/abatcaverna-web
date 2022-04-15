import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Stripe from "stripe";
import UserRepository from "../Repository/UserRepository";

export default class CheckoutController {
  private _userRepository: UserRepository;
  private _stripe: Stripe

  constructor(userRepository: UserRepository, stripe: Stripe) {
    this._userRepository = userRepository;
    this._stripe = stripe;
  }
  public async index(req: NextApiRequest, res:NextApiResponse) {
    const session = await getSession({ req })

    if (!session) res.status(403).send("User must be logged in")

    const { user } = session!

    const userFound = await this._userRepository.getUserByEmail(user?.email!)

    if (!userFound) res.status(400).send("User does not exist")

    const { priceId } = req.body

    if (!priceId) res.status(400).send("Must send price id")

    const stripeCheckoutSession = await this._stripe.checkout.sessions.create({
      customer: userFound.stripe_customer_id,
      line_items: [
          {
              price: priceId, quantity: 1
          }
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    })

    res.status(200).json({sessionId: stripeCheckoutSession.id})

  }
}