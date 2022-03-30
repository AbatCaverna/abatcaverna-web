import { NextApiRequest, NextApiResponse } from 'next';
import AcessoController from '../../../backend/Controller/AcessoController';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const aceesoController = new AcessoController()
  if (req.method === 'POST') {
    const response = aceesoController.index(req, res);
    return res.status(200).send(response)
  }
}