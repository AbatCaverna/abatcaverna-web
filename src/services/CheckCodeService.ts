import axios, { AxiosInstance } from 'axios';

export default class CheckCodeService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/api'
        : 'https://abatcaverna.app/api'
    })
  }

  public async check(code: string) {
    return await this.api.post('/check-code', { token: code }) 
  }

}