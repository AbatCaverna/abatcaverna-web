// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import MoradoresController from '../../../backend/Controller/MoradoresController';
import connectMongo from '../../../backend/Providers/mongo'

type Morador = {
  _id: string;
  nome: string;
  apelido: string;
  ano_entrada: number;
  curso: string;
  imagem: string;
  instagram: string;
  cachaca_para_tomar: number;
  cachaca_ja_tomada: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { database } = await connectMongo()
  
  if (database === undefined) {
    return res.status(500).send("Could not connect to database")
  }

  const moradoresController = new MoradoresController(database)
  
  if (req.method === 'GET') {
    const moradores = await moradoresController.index()
    
    res.status(200).send(moradores)
  }

  if (req.method === 'PUT') {
    const { method_action, morador_id } = req.body

    const response = await moradoresController.update(method_action, morador_id)
      
    res.status(200).send(response)
  }
    
               
    
}
