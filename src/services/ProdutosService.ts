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

export type ProductsResponse = {
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
  
  async createProduct(name: string, value: number, description?: string, images?: string[]) {
    return await API.post('/produtos', { name, description, value, images })
  },

  async uploadProductImage(photo: File) {
    const form = new FormData()
    form.append('photo', photo)

    return await API.post('/produtos/upload-file', form, { headers: {
      'Content-Type': 'multipart/form-data'
    }})
  }

}

export default ProdutosService
