import axios, { AxiosInstance } from 'axios';

export default class ProdutosService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://abatcaverna.app/api'
    })
  }

  async getAllProducts() {
    return await this.api.get('/produtos') 
  }

}