import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    const response = {
      NextAuthURL: process.env.NEXTAUTH_URL,
      NodeEnv: process.env.NODE_ENV
    }
    return res.status(200).send(response)
  }
}