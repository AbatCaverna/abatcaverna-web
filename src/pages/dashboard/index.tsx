
import Link from "next/link";
import SideBar from "../../components/Dashboard/SideBar";
import useRole from "../../hooks/useRole";
import styles from "../../styles/Dashboard.module.css";

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
    <div className={styles.container}>
      <SideBar/>
      <main>
        Dashboard teste

      </main>
    </div>
  );
}
