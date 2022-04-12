import Stripe from "stripe"
import ProdutosRepository from "../Repository/ProdutosRepository"
import ProdutosService from "../Service/ProdutosService"
import Produto from "../Models/Produto"

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

  public async createProduct({ name, description, value}: Produto) {
    try {
      return await this.produtosService.createProduct({ name, description, value })
    } catch (error) {
      return error
    }
  }
}