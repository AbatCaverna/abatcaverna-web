import API from './API'

const MoradoresService = {

  async getMoradores() {
    return await API.get('/moradores') 
  },

  async setCachaca(moradorId: string) {
    return await API.put('/moradores',  {
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
