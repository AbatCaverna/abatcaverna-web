import axios, { AxiosInstance } from 'axios';

import { ProductsResponse } from 'types'

export default class ProdutosService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000/api'
      : 'https://abatcaverna.app/api'
    })
  }

  public async getAllProducts() {
    return await this.api.get<ProductsResponse>(`/produtos`) 
  }

  public async getAllProductsByUser(email: string) {
    return await this.api.get<ProductsResponse>(`/produtos/${email}`)
  }
  
  public async createProduct(name: string, value: number, description?: string) {
    return await this.api.post('/produtos', { name, description, value })
  }

}