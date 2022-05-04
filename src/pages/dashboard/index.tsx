
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Stripe from "stripe";
import Perfil from "../../components/Dashboard/Perfil";
import Produtos from "../../components/Dashboard/Produtos";
import SideBar from "../../components/Dashboard/SideBar";
import useRole from "../../hooks/useRole";
import ProdutosService from "../../services/ProdutosService";
import styles from "../../styles/Dashboard.module.css";

enum DashboardPages {
  profile = 'profile',
  product = 'product'
}

type DashboardPagesType = keyof typeof DashboardPages

type ProductsResponse = {
  product: Stripe.Response<Stripe.Product>;
  price: Stripe.Price;
}[]

interface DashboardPage {
  produtos: ProductsResponse
}

export default function DashboardPage({ produtos }: DashboardPage) {
  const morador = useRole()

  if(!morador) {
    return (
      <div>
        <h1>Não pode acessar essa pagina</h1>
        <Link href="/">
          <a >Voltar para home</a>
        </Link>
      </div>
    )
  }


  return (
    <div className={styles.container}>
      <SideBar />
      <main>
        <Perfil user={morador}/>
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


  return {
    props: {},
  }
}
