import MoradoresRepository from "../Repository/MoradoresRepository";

export default class MoradoresService {

  private _moradorRepository: MoradoresRepository;

  constructor(moradorRepository: MoradoresRepository) {
    this._moradorRepository = moradorRepository;
  }

  public async show() {
    try {
      const moradores = await this._moradorRepository.getAllMoradores()
    
      return moradores;
    } catch (error) {
      throw new Error("Erro no servidor")
    }

  }

  public async atualizaCachaca(method_action: string, morador_id: string) {
    if (method_action === 'sum_cachaca') {
      this._moradorRepository.addCachaca(morador_id);

      return 'Cachaca adicionada'

    } else if (method_action === 'drunk_cachaca') {
      const morador = await this._moradorRepository.getOneMorador(morador_id);

      if(morador.cachaca_para_tomar === 0) {
        await this._moradorRepository.updateCachaca(morador_id, 1);
      } else {
        await this._moradorRepository.updateCachaca(morador_id, 1, -1);
      }
      
      return 'Cachaca bebida'
    }
  }
}
