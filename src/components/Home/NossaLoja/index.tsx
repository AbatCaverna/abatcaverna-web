import useAlert from "hooks/useAlert";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import CheckoutService from "../../../services/CheckoutService";
import ProdutosService, { Product } from "../../../services/ProdutosService";
import getStripe from "../../../services/stripejs";
import ProductCard from "../../Loja/ProductCard";
import Loader from "../../Shared/Loading";
import styles from "./styles.module.css";
import useProdutosQuery from "query/produtosQuery";

export default function NossaLoja() {
  const [loading, setLoading] = useState(false)
  const session = useSession()
  const { setAlert } = useAlert()

  async function handleBuyButton(priceId: string) {
    try {
      setLoading(true)
      if (session.status === "unauthenticated") await signIn("google")

      const email = session.data?.user?.email!

      const response = await CheckoutService.createCheckoutSession(priceId, email)
      const stripe = await getStripe()
  
      await stripe?.redirectToCheckout({ sessionId: response.data.sessionId })
      
    } catch (error) {
      console.log('redirect to checkout error',error)
      setAlert({
        message: error as string,
        title: 'Error!',
        type: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  const { data, isFetching } = useProdutosQuery()
  
  return (
    <section id="nossa-loja">
      <h2 className={styles.title}>Nossa Loja</h2>
      <div className={styles.flex}>
        {data?.data.products.map((produto) => (
          <ProductCard
            key={produto.id}
            data={produto}
            handleClick={handleBuyButton}
            />
        ))}
        {(isFetching || loading) && (
          <div className={styles.loading}>
            <Loader/>
            <p>Carregando...</p>
          </div>
        )}
      </div>
    </section>
  ) 
}