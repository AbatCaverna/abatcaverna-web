import axios, { AxiosInstance } from 'axios';

interface AcessoResponse  {
  message: string;
  valid: boolean;
}
export default class AcessoService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://abatcaverna.app/api'
    })
  }

  public async acesso(code: string) {
    return await this.api.post<AcessoResponse>('/access', { code }) 
  }

}