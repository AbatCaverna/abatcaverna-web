import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import returnHashString from 'backend/Utils/crypto'
import MoradoresController from 'backend/Controller/MoradoresController';
import connectMongo from 'backend/Providers/mongo';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { database } = await connectMongo()

  if (database === undefined) {
    return res.status(500).send("Could not connect to database")
  }
  
  const moradoresController = new MoradoresController(database)
  
  if (req.method === 'PUT') {
    const isRecover = !!req.body.hashCode

    // se nao vem da tela de recuperar senha entao
    // precisamos verificar se o usuario esta autenticado
    if (!isRecover) {
      const session = await getSession({ req })

      if (!session) res.status(403).send("User not authenticated")
  
      if (session?.role !== "cavernoso") res.status(403).send("User not allowed")
    } else {
      // caso contrario verificamos se o hashCode eh valido
      if (req.body.hashCode !== returnHashString(process.env.ABAT_RECOVER_CODE!)) {
        return res.status(403).send("User not allowed")
      }
    }

    const { name, new_password } = req.body

    try {
      const response = await moradoresController.updatePassword(name, new_password)

      res.status(200).send(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}