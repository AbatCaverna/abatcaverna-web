import { createContext, ReactNode, useContext, useState } from 'react'
import Stripe from 'stripe';

type ProductItem = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}

type CartContext = {
  products: Array<ProductItem>
}

export const CartContext = createContext({} as CartContext)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState([] as Array<ProductItem>)
  return (
    <CartContext.Provider value={{ products }}>
      {children}
    </CartContext.Provider>
  )
}