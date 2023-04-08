import API from './API'

export type Product = {
  id: string
  stripe_id: string
  image: string
  name: string
  tax: string
  price: number
  stripe_price_id: string
}

type ProductsResponse = {
  message: string
  products: Product[]
}

const ProdutosService = {

  async getAllProducts() {
    return await API.get<ProductsResponse>(`/produtos`)
  },

  async getAllProductsByUser(email: string) {
    return await API.get<ProductsResponse>(`/produtos/${email}`)
  },
  
  async createProduct(name: string, value: number, description?: string, image?: string) {
    return await API.post('/produtos', { name, description, value, image })
  },

  async uploadProductImage(photo: File) {
    return await API.post('/produtos/upload-file', { photo })
  }

}

export default ProdutosService
