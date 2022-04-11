import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const { data } = useSession()
  const router = useRouter();

  if(data?.role !== "cavernoso") {
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
    <div>
      Dashboard teste
    </div>
  );
}
