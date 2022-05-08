import { NextApiRequest, NextApiResponse } from "next";
import jsonwebtoken from '../Utils/encoder'

export default class CheckCodeController {
  async index(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { token } = req.body
      const jwt = jsonwebtoken()
      const verify = jwt.decode(token)
      res.send(verify)
    } catch (error) {
      res.status(403).send('Invalido')
    }

  }
}