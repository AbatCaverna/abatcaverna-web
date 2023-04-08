import API from './API'

type Session = {
  message: string
}

export type Morador = {
  _id: string
  nome: string
  apelido: string
  ano_entrada: number
  curso: string
  imagem: string
  instagram: string
  cachaca_ja_tomada: number
  cachaca_para_tomar: number
  role: string
  token: string
  email?: string
}

interface MoradorSession extends Session {
  user: Morador
}

type User = {
  name: string
  email: string
  role: string
}

export interface UserData extends User {
  _id: string
  stripe_customer_id: string
  token: string
}

interface UserResponse extends Session {
  user: UserData
}

const SessionService = {
  async loginMorador(username: string, password: string) {
    return await API.post<MoradorSession>('/session/morador', {username, password})
  },

  async loginUser(user: User) {
    return await API.post<UserResponse>('/session/user', { user })
  }
}

export default SessionService
