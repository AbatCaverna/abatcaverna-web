import { GetServerSideProps } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import Stripe from 'stripe';
import CarrinhoIcone from '../../components/Loja/CarrinhoIcone';
import ProductCard from '../../components/Loja/ProductCard';
import Loader from '../../components/Shared/Loading';
import useWindow from '../../hooks/useWindow';
import CheckoutService from '../../services/CheckoutService';
import ProdutosService from '../../services/ProdutosService';
import getStripe from "../../services/stripejs";
import styles from '../../styles/Loja.module.css'

type ProductsResponse = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}[]

interface Loja {
  data: ProductsResponse
}

export default function Loja({ data }: Loja) {
  const window = useWindow();
  const [showCartIcon, setShowCartIcon] = useState(false)
  const [loading, setLoading] = useState(false)
  const checkoutService = new CheckoutService()
  const session = useSession()

  async function handleBuyItem(priceId: string) {
    try {
      setLoading(true)
      if (session.status === "unauthenticated") await signIn("google")

      const response = await checkoutService.createCheckoutSession(priceId)
      const stripe = await getStripe()
  
      await stripe?.redirectToCheckout({ sessionId: response.data.sessionId })
      
    } catch (error) {
      console.log('redirect to checkout error',error)
      alert(`Error! ${error}`)
    } finally {
      setLoading(false)
    }

  }
  
  useEffect(() => {
    if (window && window.width < 480) {
      setShowCartIcon(false)
    } else {
      setShowCartIcon(true)
    }
  },[window])

  return (
    <div>
      <Head>
        <title>Loja AbatCaverna</title>
        <meta name="description" content="Loja da república AbatCaverna de Florestal MG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <header>
          <SiHomeassistantcommunitystore size="2rem"/>
          <h1>Loja ABatCaverna</h1>
          {showCartIcon && <CarrinhoIcone />}
        </header>
        <div className={styles.list_items}>
          {data.map((item) => (
            <ProductCard key={item.product.id} data={item} handleClick={handleBuyItem} />
          ))}
          {!data && (
            <div>Não tem produtos à venda</div>
          )}
        </div>
        {loading && (
          <div className={styles.loading}>
            <Loader/>
            <p>Carregando...</p>
          </div>
        )}
      </main>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  const produtosService = new ProdutosService()
  const response = await produtosService.getAllProducts()

  return {
    props: {
      data: response.data
    },
  }
}