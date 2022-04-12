import Morador from "../Models/Morador";
import MoradoresRepository from "../Repository/MoradoresRepository";
import returnHashString from "../Utils/crypto";

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

  public async createMorador(morador: Morador) {
    const newMorador = new Morador(
      morador.nome,
      morador.apelido,
      morador.ano_entrada,
      morador.curso,
      morador.imagem,
      morador.instagram,
      morador.cachaca_para_tomar,
      morador.cachaca_ja_tomada,
      returnHashString(morador.senha!)
    )

    const created = await this._moradorRepository.create(newMorador)
    return created.insertedId;
  }


  public async changePassword(name: string, new_password: string) {
    try {
      const morador = await this._moradorRepository.getMorador(name)
      const new_password_hash = returnHashString(new_password)

      if (morador.senha === new_password_hash) {
        throw new Error("Password must be different from old password")
      }

      await this._moradorRepository.changePassword(name, new_password_hash)
    } catch (error) {
      throw new Error("Could not change password")
    }
  }
}
