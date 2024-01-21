
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { DashboardLayout } from "domain/Dashboard/SharedComponents";
import Produtos from "domain/Dashboard/Produtos";
import ProdutosService, { ProductsResponse } from "services/ProdutosService";

interface ProdutosPage {
  produtos: ProductsResponse
}

export default function ProdutosPage({ produtos }: ProdutosPage) {

  return (
    <DashboardLayout>
      <Produtos data={produtos} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  console.log('session', session)

  if (!session || (session as any).role !== "cavernoso") {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const response = await ProdutosService.getAllProducts()

  return {
    props: {
      produtos: response.data
    },
  }
}
