import { useQuery } from "react-query"

import ProdutosService from "../services/ProdutosService"

function useProdutosQuery(email?: string | null) {
  return useQuery(
    ['products', email], 
    email ? () => ProdutosService.getAllProductsByUser(email) : ProdutosService.getAllProducts,
    {
      enabled: !!email
    }
  )
}

export default useProdutosQuery
