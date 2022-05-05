import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Stripe from 'stripe';
import CheckoutService from '../services/CheckoutService';
import getStripe from '../services/stripejs';

type ProductItem = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}

type CartContext = {
  products: Array<ProductItem>
  loading: boolean
  addToCart: (item: ProductItem) => void
  removeFromCart: (item:  ProductItem) => void
  cartCheckout: () => void
}

export const CartContext = createContext({} as CartContext)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState([] as Array<ProductItem>)
  const [loading, setLoading] = useState(false)
  const session = useSession()

  function addToCart(item: ProductItem) {
    setProducts(prev => [...prev, item])
    localStorage.setItem('cart', JSON.stringify(products))
    alert("Produto adicionao ao carrinho!")
  }

  function removeFromCart(item: ProductItem) {
    const newProductList = products.filter(p => p.price.id != item.price.id)
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
      const email = session.data?.user?.email

      if (!email) throw new Error("User not logged in")

      const data = {
        email,
        line_items: products.map((product) => {
          return {
            price: product.price.id,
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