
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";

import { DashboardLayout } from "domain/Dashboard/SharedComponents";
import Perfil from "domain/Dashboard/Perfil";
import useRole from "hooks/useRole";
import useSessionToStorage from "hooks/useSessionToStorage";

export default function DashboardPage() {
  const morador = useRole()

  useSessionToStorage()

  if (!morador) {
    return (
      <div>
        <h1>Não pode acessar essa pagina</h1>
        <Link href="/">
          Voltar para home
        </Link>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <Perfil user={morador} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session || (session as any).role !== "cavernoso") {
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
