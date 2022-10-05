import axios, { AxiosInstance } from 'axios';

export interface Tarefas  {
  name: string
  task: string 
}

export default class TarefasService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/api'
        : 'https://abatcaverna.app/api'
    })
  }

  public async getTarefas() {
    return await this.api.get<Tarefas[]>('/tarefas') 
  }

}