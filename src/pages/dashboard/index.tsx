
import Link from "next/link";
import Perfil from "../../components/Dashboard/Perfil";
import SideBar from "../../components/Dashboard/SideBar";
import useRole from "../../hooks/useRole";
import styles from "../../styles/Dashboard.module.css";

export default function DashboardPage() {
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

  function handleRouteChange(route: string) {
    console.log(route)
  }

  return (
    <div className={styles.container}>
      <SideBar onChangeRoute={handleRouteChange} />
      <main>
        <Perfil user={morador}/>

      </main>
    </div>
  );
}
