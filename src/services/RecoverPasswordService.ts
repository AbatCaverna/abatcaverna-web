import axios, { AxiosInstance } from "axios";

export default class RecoverPasswordService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000/api'
      : 'https://abatcaverna.app/api'
    })
  }

  public async checkRecoverCode(code: string) {
    return await this.api.put(`/recover-password`, { code }) 
  }
}