// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import CheckoutController from 'backend/Controller/CheckoutController';
import connectMongo from 'backend/Providers/mongo';
import stripe from 'backend/Providers/stripe';
import UserRepository from 'backend/Repository/UserRepository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method === 'POST') {
    const { database } = await connectMongo()
    if (!database) return res.status(500).send("Database could not connect")
    const userRepo = new UserRepository(database)
    const checkoutController = new CheckoutController(userRepo, stripe)
    await checkoutController.index(req, res)
  } else if (method === 'GET') {
    const { database } = await connectMongo()
    if (!database) return res.status(500).send("Database could not connect")
    const userRepo = new UserRepository(database)
    const checkoutController = new CheckoutController(userRepo, stripe)
    await checkoutController.getSession(req, res)
  } else {
    res.setHeader('Allow', 'POST')
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')    

  }
}
