
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { DashboardLayout } from "components/Dashboard/SharedComponents";
import Produtos from "components/Dashboard/Produtos";
import ProdutosService from "services/ProdutosService";
import { ProductsResponse } from "types";

interface ProdutosPage {
  produtos: ProductsResponse
}

export default function ProdutosPage({ produtos }: ProdutosPage) {

  return (
    <DashboardLayout>
        <Produtos data={produtos}/>
    </DashboardLayout>
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
