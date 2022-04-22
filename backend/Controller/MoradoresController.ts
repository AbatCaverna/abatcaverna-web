import { NextApiRequest, NextApiResponse } from 'next';
import MoradoresService from '../Service/MoradoresService';
import MoradoresRepository from '../Repository/MoradoresRepository';
import Morador from "../Models/Morador";
import { Db } from 'mongodb';

export default class MoradoresController {
  private moradoresService: MoradoresService;
  
  constructor(db: Db) {
    const repository = new MoradoresRepository(db)
    this.moradoresService = new MoradoresService(repository);
  }

  public async store(morador: Morador) {

    const response = await this.moradoresService.createMorador(morador);
    
    return {
      message: response ? 'Sucesso' : 'Erro',
      moradores: response
    }
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

  public async updatePassword(name: string, new_password: string) {
    try {
      await this.moradoresService.changePassword(name, new_password);
      return {
        message: "Password changed!",
      }
    } catch (error) {
      return error
    }

  }
}