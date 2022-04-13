import { useRouter } from "next/router";
import { MdSpaceDashboard } from "react-icons/md"
import styles from "./styles.module.css"

export default function SideBar() {
  const router = useRouter()

  function onChangeRoute(route: string) {
    router.push('/dashboard/'+route)
  }

  return (
    <div className={styles.navbar}>
      <h1>
        <MdSpaceDashboard/> Dashboard
      </h1>
      <nav className={styles.navbar_menu}>
        <ul>
          <strong>Morador</strong>
          <hr />
          <li onClick={() => onChangeRoute('')}>Perfil</li>
          <li onClick={() => onChangeRoute('cachaca')}>Cachaça</li>
          <strong>Loja</strong>
          <hr />
          <li onClick={() => onChangeRoute('produtos')}>Produtos</li>
          <li onClick={() => onChangeRoute('pedidos')}>Pedidos</li>
        </ul>
      </nav>
    </div>
  );
}