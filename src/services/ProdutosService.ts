import axios, { AxiosInstance } from 'axios';

export default class ProdutosService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://dev.abatcaverna.app/api'
    })
  }

  public async getAllProducts() {
    return await this.api.get('/produtos') 
  }
  
  public async createProduct(name: string, value: number, description?: string) {
    return await this.api.post('/produtos', { name, description, value })
  }

}