import ProdutosRepository from "../Repository/ProdutosRepository"
import Produto from "../Models/Produto"

export default class ProdutosService {
  private _produtosRepository: ProdutosRepository

  constructor(produtosRepository: ProdutosRepository) {
    this._produtosRepository = produtosRepository
  }

  public async getAllProducts(email?: string) {
    try {
      return await this._produtosRepository.getAllProducts(email)
    } catch (error) {
      throw new Error("Could not get products")
    }
  }

  public async createProduct(product: Produto) {
    try {
      return await this._produtosRepository.createProduct(
        product.name,
        product.value,
        product.description
      )
    } catch (error) {
      throw new Error("Could not create product")
    }

  }
}