import axios from 'axios'

const API_INSTANCE = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3333'
    : 'https://abatcavernaapi.azurewebsites.net'
})

API_INSTANCE.interceptors.request.use(
  async (request) => {
    const local = localStorage.getItem('session')

    if (local) {
      const { accessToken } = JSON.parse(local)
      request.headers!.Authorization = accessToken
    }
  

    return request
  },
  error => Promise.reject(error)
)

export default API_INSTANCE
