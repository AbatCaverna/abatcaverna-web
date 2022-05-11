import { NextApiRequest, NextApiResponse } from 'next';
import CheckCodeController from '../../../backend/Controller/CheckCodeController';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const checkCodeController = new CheckCodeController()
  if (req.method === 'POST') {
    await checkCodeController.index(req, res);
  }
}