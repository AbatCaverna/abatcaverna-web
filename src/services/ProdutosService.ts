import axios, { AxiosInstance } from 'axios';

export default class ProdutosService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.ABAT_API_URL
    })
  }

  public async getAllProducts() {
    return await this.api.get(`/produtos`) 
  }

  public async getAllProductsByUser(email: string) {
    return await this.api.get(`/produtos/${email}`)
  }
  
  public async createProduct(name: string, value: number, description?: string) {
    return await this.api.post('/produtos', { name, description, value })
  }

}