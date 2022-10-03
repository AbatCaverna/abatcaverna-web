import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import CheckoutService from "../../../services/CheckoutService";
import ProdutosService from "../../../services/ProdutosService";
import getStripe from "../../../services/stripejs";
import ProductCard from "../../Loja/ProductCard";
import Loader from "../../Shared/Loading";
import styles from "./styles.module.css";

type Produtos = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}

export default function NossaLoja() {
  const [produtos, setProdutos] = useState([] as Produtos[])
  const [loading, setLoading] = useState(false)
  const session = useSession()

  async function handleBuyButton(priceId: string) {
    try {
      setLoading(true)
      const checkoutService = new CheckoutService()
      if (session.status === "unauthenticated") await signIn("google")

      const email = session.data?.user?.email!

      const response = await checkoutService.createCheckoutSession(priceId, email)
      const stripe = await getStripe()
  
      await stripe?.redirectToCheckout({ sessionId: response.data.sessionId })
      
    } catch (error) {
      console.log('redirect to checkout error',error)
      alert(`Error! ${error}`)
    } finally {
      setLoading(false)
    }
  }

  function fetchProducts() {
    const produtcService = new ProdutosService()
    produtcService.getAllProducts().then((response) => {
      setProdutos(response.data)
    })
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <section id="nossa-loja">
      <h2 className={styles.title}>Nossa Loja</h2>
      <div className={styles.flex}>
        {produtos.map((produto) => (
          <ProductCard
            key={produto.price.id}
            data={produto}
            handleClick={handleBuyButton}
            />
        ))}
        {loading && (
          <div className={styles.loading}>
            <Loader/>
            <p>Carregando...</p>
          </div>
        )}
      </div>
    </section>
  ) 
}