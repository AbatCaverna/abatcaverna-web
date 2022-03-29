import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'POST') {
    const { code } = req.body

    if (code === process.env.ABAT_TOKEN)
      res.status(200).send({
        message: 'Sucesso',
        valid: true
      })

    res.status(403).send({
      message: 'Erro',
      valid: false
    })
  }


}