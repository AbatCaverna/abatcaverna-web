import axios, { AxiosInstance } from 'axios';

export default class MoradoresService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://dev.abatcaverna.app/api'
    })
  }

  async getMoradores() {
    return await this.api.get('/moradores') 
  }

  async setCachaca(moradorId: string) {
    return await this.api.put('/moradores',  {
      method_action: 'sum_cachaca', 
      morador_id: moradorId
    })
  }

  async drinkCachaca(moradorId: string) {
    return await this.api.put('/moradores', {
      method_action: 'drunk_cachaca', 
      morador_id: moradorId
    })
  }

  async changePassword(name: string, new_password: string) {
    return await this.api.put('/change-password', {
      name,
      new_password
    })
  }
}