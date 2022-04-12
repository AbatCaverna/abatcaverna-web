import { MdSpaceDashboard } from "react-icons/md"
import styles from "./styles.module.css"

export default function SideBar() {
  return (
    <div className={styles.navbar}>
      <h1>
        <MdSpaceDashboard/> Dashboard
      </h1>
      <nav className={styles.navbar_menu}>
        <ul>
          <strong>Morador</strong>
          <hr />
          <li>Perfil</li>
          <strong>Loja</strong>
          <hr />
          <li>Produtos</li>
          <li>Pedidos</li>
        </ul>
      </nav>
    </div>
  );
}