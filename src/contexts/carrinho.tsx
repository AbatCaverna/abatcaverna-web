import { createContext, ReactNode, useContext, useState } from 'react'
import Stripe from 'stripe';
import CheckoutService from '../services/CheckoutService';
import getStripe from '../services/stripejs';

type ProductItem = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}

type CartContext = {
  products: Array<ProductItem>
  addToCart: (item: ProductItem) => void
  removeFromCart: (item:  ProductItem) => void
  cartCheckout: () => void
}

export const CartContext = createContext({} as CartContext)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState([] as Array<ProductItem>)

  function addToCart(item: ProductItem) {
    setProducts(prev => [...prev, item])
    alert("Produto adicionao ao carrinho!")
  }

  function removeFromCart(item: ProductItem) {
    const newProductList = products.filter(p => p != item)
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

    try {
      const service = new CheckoutService()
      const data = {
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
    }
  }

  return (
    <CartContext.Provider value={{ products, addToCart, removeFromCart, cartCheckout }}>
      {children}
    </CartContext.Provider>
  )
}