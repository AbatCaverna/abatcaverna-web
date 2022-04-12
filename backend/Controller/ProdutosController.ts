import Stripe from "stripe"
import ProdutosRepository from "../Repository/ProdutosRepository"
import ProdutosService from "../Service/ProdutosService"

export default class ProdutosController {
  private produtosService: ProdutosService
  constructor(stripe: Stripe) {
    const produtosRepo = new ProdutosRepository(stripe)
    this.produtosService = new ProdutosService(produtosRepo)
  }

  public async getAllProducts() {
    try {
      return await this.produtosService.getAllProducts()
    } catch (error) {
      return error
    }
  }
}