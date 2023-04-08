import { createContext, ReactNode, useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react';

import useAlert from 'hooks/useAlert';
import CheckoutService from 'services/CheckoutService';
import { Product } from 'services/ProdutosService';
import getStripe from 'services/stripejs';


type CartContext = {
  products: Array<Product>
  loading: boolean
  addToCart: (item: Product) => void
  removeFromCart: (item:  Product) => void
  cartCheckout: () => void
}

export const CartContext = createContext({} as CartContext)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState([] as Array<Product>)
  const [loading, setLoading] = useState(false)
  const session = useSession()
  const { setAlert } = useAlert()

  function addToCart(item: Product) {
    setProducts(prev => [...prev, item])
    localStorage.setItem('cart', JSON.stringify(products))
    setAlert({
      message: "Produto adicionao ao carrinho!",
      type: "success"
    })
  }

  function removeFromCart(item: Product) {
    const newProductList = products.filter(p => p.stripe_price_id != item.stripe_price_id)
    localStorage.setItem('cart', JSON.stringify(newProductList))
    setProducts(newProductList)
  }

  /**
   * Todo
   * - adicionar quantidade correta de items selecionado pelo usuario
   */
  async function cartCheckout() {
    if (products.length == 0) {
      throw new Error("Carrinho está vazio!")
    }

    setLoading(true)

    try {
      const service = new CheckoutService()
      
      if (session.status === "unauthenticated") await signIn("google")
      
      const email = session.data?.user?.email!
      const data = {
        email: email,
        line_items: products.map((product) => {
          return {
            price: product.stripe_price_id,
            quantity: 1
          }
        })
      }

      const response = await service.createCartCheckoutSession(data)
      const stripe = await getStripe()
  
      await stripe?.redirectToCheckout({ sessionId: response.data.sessionId })
    } catch (error) {
      throw new Error("Erro ao tentar fazer a compra!")
    } finally {
      setLoading(false)
    }
  }

  /**
   * Persistimos o carrinho localstorage para
   * termos acesso aos dados no navegador
   */
  useEffect(() => {
    const products = localStorage.getItem('cart')

    if (products) {
      const data = JSON.parse(products)
      setProducts(data)
    }
  }, [])

  return (
    <CartContext.Provider value={{ products, addToCart, removeFromCart, cartCheckout, loading }}>
      {children}
    </CartContext.Provider>
  )
}