import axios from 'axios'

const API_INSTANCE = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3333'
    : 'https://abatcavernaapi.azurewebsites.net'
})

API_INSTANCE.interceptors.request.use(
  async (request) => {
    if(typeof window !== 'undefined') {
      const local = localStorage.getItem('session')
      const data = local && JSON.parse(local)
      if (data) {
        request.headers!.Authorization = data.accessToken
      }
    }
  

    return request
  },
  error => Promise.reject(error)
)

export default API_INSTANCE
