// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import ProdutosController from 'backend/Controller/ProdutosController';
import connectMongo from 'backend/Providers/mongo'
import Stripe from 'backend/Providers/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { database } = await connectMongo()
  
  if (database === undefined) {
    return res.status(500).send("Could not connect to database")
  }

  const produtosController = new ProdutosController(Stripe, database)

  if (req.method === 'GET') {
    try {
      const produtos = await produtosController.getAllProducts(req, res)
      
      res.status(200).send(produtos)
    } catch (error) {
      console.log('[SERVER]: Something went wrong with server', error)
      res.status(500).send(error)
    }
  }

  if (req.method === 'POST') {
    const { name, description, value } = req.body
    const produto = await produtosController.createProduct({ name, description, value })
    res.status(200).send(produto)
  }

}
