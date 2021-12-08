// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import ConnectDatabase from '../../services/mongo'

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
  const database = (await ConnectDatabase).db('abatcaverna')
  if (req.method === 'GET') {
    const moradores = await database
      .collection("moradores")
      .find({ cachaca_para_tomar: { $exists: true } }) // retira selina dos moradores
      .sort({ cachaca_ja_tomada: -1 }) // ordenas pelos q tomaram mais cachaca
      .toArray();
    
    res.status(200).send(moradores)
  }

  if (req.method === 'PUT') {
    const { method_action, morador_id } = req.body

    if (method_action === 'sum_cachaca') {
      // define uma nova cachaca para um morador
      await database.collection("moradores").updateOne(
        {
            _id: new ObjectId(morador_id),
        },
        { $inc: { cachaca_para_tomar: 1 } }
    );

      res.status(200).send('Cachaca adicionada')
    } else if (method_action === 'drunk_cachaca') {
      await database.collection("moradores").updateOne(
        { _id: new ObjectId(morador_id) },
        { $inc: { 
          cachaca_para_tomar: -1,
          cachaca_ja_tomada: 1
        }}
      )
      res.status(200).send('Cachaca bebida')
    }
    
               
    
  }
  
}
