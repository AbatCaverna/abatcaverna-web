// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import CheckoutController from '../../../backend/Controller/CheckoutController';
import connectMongo from '../../../backend/Providers/mongo';
import stripe from '../../../backend/Providers/stripe';
import UserRepository from '../../../backend/Repository/UserRepository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { database } = await connectMongo()
    const userRepo = new UserRepository(database)
    const checkoutController = new CheckoutController(userRepo, stripe)
    await checkoutController.index(req, res)
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed')    

  }
}
