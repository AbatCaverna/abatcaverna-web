import { createContext, ReactNode, useContext, useState } from 'react'
import Stripe from 'stripe';

type ProductItem = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}

type CartContext = {
  products: Array<ProductItem>
  addToCart: (item: ProductItem) => void
  removeFromCart: (item:  ProductItem) => void
}

export const CartContext = createContext({} as CartContext)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState([] as Array<ProductItem>)

  function addToCart(item: ProductItem) {
    setProducts(prev => [...prev, item])
  }

  function removeFromCart(item: ProductItem) {
    const newProductList = products.filter(p => p != item)
    setProducts(newProductList)
  }

  return (
    <CartContext.Provider value={{ products, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}