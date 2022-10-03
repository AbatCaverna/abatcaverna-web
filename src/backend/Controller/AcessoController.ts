import { NextApiRequest, NextApiResponse } from 'next';
import AcessoService from '../Service/AcessoService';

export default class AcessoController {
  private acessoService: AcessoService; 

  constructor() {
    this.acessoService = new AcessoService();
  }

  public index(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.body

    const response = this.acessoService.checkCode(code);
    
    return {
      message: response ? 'Sucesso' : 'Erro',
      valid: response
    }
  }
}