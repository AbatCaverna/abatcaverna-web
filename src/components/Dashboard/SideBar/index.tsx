import { MdSpaceDashboard } from "react-icons/md"
import styles from "./styles.module.css"
interface SideBar {
  onChangeRoute: (route: string) => void
}

export default function SideBar({ onChangeRoute }: SideBar) {
  return (
    <div className={styles.navbar}>
      <h1>
        <MdSpaceDashboard/> Dashboard
      </h1>
      <nav className={styles.navbar_menu}>
        <ul>
          <strong>Morador</strong>
          <hr />
          <li onClick={() => onChangeRoute('perfil')}>Perfil</li>
          <strong>Loja</strong>
          <hr />
          <li onClick={() => onChangeRoute('produtos')}>Produtos</li>
          <li onClick={() => onChangeRoute('pedidos')}>Pedidos</li>
        </ul>
      </nav>
    </div>
  );
}