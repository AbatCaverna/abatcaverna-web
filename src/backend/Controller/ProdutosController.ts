import { NextApiRequest, NextApiResponse } from "next"
import { Db } from "mongodb"
import Stripe from "stripe"

import ProdutosRepository from "../Repository/ProdutosRepository"
import ProdutosService from "../Service/ProdutosService"
import Produto from "../Models/Produto"

export default class ProdutosController {
  private produtosService: ProdutosService
  constructor(stripe: Stripe, db: Db) {
    const produtosRepo = new ProdutosRepository(stripe, db)
    this.produtosService = new ProdutosService(produtosRepo)
  }

  public async getAllProducts(req: NextApiRequest, res: NextApiResponse): Promise<any | unknown> {
    try {
      return await this.produtosService.getAllProducts()
    } catch (error) {
      return error
    }
  }

  public async getAllProductsByEmail(req: NextApiRequest, res: NextApiResponse): Promise<any | unknown> {
    try {
      const { email } = req.query
      if (typeof email !== 'string') return res.status(500).send("error")
      return await this.produtosService.getAllProducts(email)
    } catch (error) {
      return error
    }
  }

  public async createProduct({ name, description, value}: Produto): Promise<any | unknown> {
    try {
      return await this.produtosService.createProduct({ name, description, value })
    } catch (error) {
      return error
    }
  }
}