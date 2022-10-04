import { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  code: string
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  
  if (req.method === 'PUT') {
    const { code } = req.body as Body

    try {
      if (code === process.env.ABAT_RECOVER_CODE) {
        return res.status(200).send({ message: "Verified" })
      }

      return res.status(401).send({ message: "Forbidden "})
    } catch (error) {
      res.status(500).send(error)
    }
  }
}