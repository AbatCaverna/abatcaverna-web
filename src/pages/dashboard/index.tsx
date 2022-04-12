
import Link from "next/link";
import useRole from "../../hooks/useRole";

export default function DashboardPage() {
  const isMorador = useRole()

  if(!isMorador) {
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
