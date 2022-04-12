import ProdutosRepository from "../Repository/ProdutosRepository"

export default class ProdutosService {
  private _produtosRepository: ProdutosRepository

  constructor(produtosRepository: ProdutosRepository) {
    this._produtosRepository = produtosRepository
  }

  public async getAllProducts() {
    try {
      return await this._produtosRepository.getAllProducts()
    } catch (error) {
      throw new Error("Could not get products")
    }
  }
}