import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { Email } from '../Providers/email';

export default class WebhookController {
  private relevantEvents: Set<string>

  private _stripe: Stripe

  constructor(stripe: Stripe) {
    this._stripe = stripe
    this.relevantEvents = new Set([
      'checkout.session.completed',
    ])
  }

  public async index(req: NextApiRequest, res: NextApiResponse) {

  }
}