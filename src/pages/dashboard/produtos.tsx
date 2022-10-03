
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Stripe from "stripe";

import Produtos from "components/Dashboard/Produtos";
import SideBar from "components/Dashboard/SideBar";
import ProdutosService from "services/ProdutosService";
import styles from "styles/Dashboard.module.css";

type ProductsResponse = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}[]

interface ProdutosPage {
  produtos: ProductsResponse
}

export default function ProdutosPage({ produtos }: ProdutosPage) {

  return (
    <div className={styles.container}>
      <SideBar />
      <main>
        <Produtos data={produtos}/>

      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  
  if (!session || session.role !== "cavernoso") {
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
      produtos: response.data
    },
  }
}
