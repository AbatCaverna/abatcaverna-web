import API from './API'
import { Morador } from './SessionService'

const MoradoresService = {

  async getMoradores() {
    return await API.get<{ moradores: Morador[] }>('/moradores')
  },

  async createMorador(data: FormData) {
    return await API.post<{ user: Morador }>('/moradores', data)
  },

  async updateMorador(data: FormData) {
    return await API.put<{ user: Morador }>('/moradores', data)
  },

  async setCachaca(moradorId: string) {
    return await API.put('/moradores', {
      method_action: 'sum_cachaca',
      morador_id: moradorId
    })
  },

  async drinkCachaca(moradorId: string) {
    return await API.put('/moradores', {
      method_action: 'drunk_cachaca',
      morador_id: moradorId
    })
  },

  async changePassword(name: string, new_password: string, hashCode?: string) {
    return await API.put('/moradores/change-password', {
      name,
      new_password,
      hashCode
    })
  }
}

export default MoradoresService
