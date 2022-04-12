// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ProdutosController from '../../../backend/Controller/ProdutosController';
import Stripe from '../../../backend/Providers/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const produtosController = new ProdutosController(Stripe)
  
  if (req.method === 'GET') {
    try {
      const produtos = await produtosController.getAllProducts()
      
      res.status(200).send(produtos)
    } catch (error) {
      res.status(500).send(error)
    }
  }

               
    
}
