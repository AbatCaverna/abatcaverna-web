// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import ProdutosController from '../../../backend/Controller/ProdutosController';
import Stripe from '../../../backend/Providers/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const produtosController = new ProdutosController(Stripe)

  if (!session) res.status(403).send("User not authenticated")

  if (session?.role !== "cavernoso") res.status(403).send("User not allowed")

  if (req.method === 'GET') {
    try {
      const produtos = await produtosController.getAllProducts()
      
      res.status(200).send(produtos)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  if (req.method === 'POST') {
    const { name, description, value } = req.body
    const produto = await produtosController.createProduct({ name, description, value })
    res.status(200).send(produto)
  }

}
