import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import Stripe from 'stripe';
import CarrinhoIcone from '../../components/Loja/CarrinhoIcone';
import ProductCard from '../../components/Loja/ProductCard';
import useWindow from '../../hooks/useWindow';
import ProdutosService from '../../services/ProdutosService';
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
            <ProductCard key={item.product.id} data={item} />
          ))}
          {!data && (
            <div>Não tem produtos à venda</div>
          )}
        </div>
      </main>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const produtosService = new ProdutosService()
  const response = await produtosService.getAllProducts()

  return {
    props: {
      data: response.data
    },
  }
}