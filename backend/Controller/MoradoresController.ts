import { NextApiRequest, NextApiResponse } from 'next';
import MoradoresService from '../Service/MoradoresService';
import MoradoresRepository from '../Repository/MoradoresRepository';
import { Db } from 'mongodb';

export default class MoradoresController {
  private moradoresService: MoradoresService;
  
  constructor(db: Db) {
    const repository = new MoradoresRepository(db)
    this.moradoresService = new MoradoresService(repository);
  }
  
  public async index() {

    const response = await this.moradoresService.show();
    
    return {
      message: response ? 'Sucesso' : 'Erro',
      moradores: response
    }
  }

  public async update(method_action: string, morador_id: string) {

    const response = await this.moradoresService.atualizaCachaca(method_action, morador_id);
    
    return {
      message: response,
    }
  }
}