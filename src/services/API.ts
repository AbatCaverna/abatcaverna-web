import axios from 'axios'

const API_INSTANCE = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3333'
    : 'https://abatcavernaapi.azurewebsites.net'
})

export default API_INSTANCE
