import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { SiHomeassistantcommunitystore } from 'react-icons/si'

import CarrinhoIcone from 'domain/Loja/CarrinhoIcone';
import ProductCard from 'domain/Loja/ProductCard';
import Loader from 'domain/Shared/Loading';
import useWindow from 'hooks/useWindow';
import CheckoutService from 'services/CheckoutService';
import ProdutosService, { Product } from 'services/ProdutosService';
import getStripe from "services/stripejs";
import styles from 'styles/Loja.module.css'
import useAlert from 'hooks/useAlert';
import useProdutosQuery from 'query/produtosQuery';


export default function Loja() {
  const window = useWindow()
  const [showCartIcon, setShowCartIcon] = useState(false)
  const [loading, setLoading] = useState(false)
  const session = useSession()
  const { setAlert } = useAlert()

  const { data, isLoading } = useProdutosQuery(session.data?.user.email)

  async function handleBuyItem(priceId: string) {
    try {
      setLoading(true)
      if (session.status === "unauthenticated") await signIn("google")

      const email = session.data?.user?.email!

      const response = await CheckoutService.createCheckoutSession(priceId, email)
      const stripe = await getStripe()

      await stripe?.redirectToCheckout({ sessionId: response.data.sessionId })

    } catch (error) {
      console.log('redirect to checkout error', error)
      setAlert({
        message: error as string,
        title: 'Error!',
        type: "error"
      })
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
  }, [window])

  return (
    <div>
      <Head>
        <title>Loja AbatCaverna</title>
        <meta name="description" content="Loja da república AbatCaverna de Florestal MG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <header>
          <SiHomeassistantcommunitystore size="2rem" />
          <h1>Loja ABatCaverna</h1>
          {showCartIcon && <CarrinhoIcone />}
        </header>
        <div className={styles.list_items}>
          {data?.data.products.length === 0 && (
            <div>Não tem produtos à venda</div>
          )}
          {data?.data.products.map((item) => (
            <ProductCard key={item.id} data={item} handleClick={handleBuyItem} />
          ))}

        </div>
        {(isLoading || loading) && (
          <div className={styles.loading}>
            <Loader />
            <p>Carregando...</p>
          </div>
        )}
      </main>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const email = session?.user?.email || undefined

  // let response: any;

  // if (email) {
  //   response = await ProdutosService.getAllProductsByUser(email)
  // } else {
  //   response = await ProdutosService.getAllProducts()

  // }

  return {
    props: {},
  }
}
