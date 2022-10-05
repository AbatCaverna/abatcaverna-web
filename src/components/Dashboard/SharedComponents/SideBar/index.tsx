import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md"

import useWindow from "hooks/useWindow";

import styles from "./styles.module.css"

export default function SideBar() {
  const router = useRouter()
  const window = useWindow()
  const [isMobile, setIsMobile] = useState(true)

  function onChangeRoute(route: string) {
    router.push('/dashboard/'+route)
  }

  useEffect(() => {
    if(window && window?.width < 580) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [window])

  return !isMobile ? (
    <div className={styles.navbar} onClick={() => isMobile && setIsMobile(!isMobile)}>
      <h1>
        <MdSpaceDashboard/> Dashboard
      </h1>
      <nav className={styles.navbar_menu}>
        <ul>
          <strong>Morador</strong>
          <hr />
          <li onClick={() => onChangeRoute('')}>Perfil</li>
          <li onClick={() => onChangeRoute('cachaca')}>Cachaça</li>
          <li onClick={() => onChangeRoute('tarefas')}>Tarefas</li>
          <strong>Loja</strong>
          <hr />
          <li onClick={() => onChangeRoute('produtos')}>Produtos</li>
          <li className={styles.navbar_menu_item_disabled}>Pedidos</li>
          <li onClick={() => onChangeRoute('qrcode')}>Scanner QRCode</li>
        </ul>
      </nav>
    </div>
  ) : (
    <div className={styles.navbar_mobile} onClick={() => setIsMobile(!isMobile)}>
      <h1>
        <MdSpaceDashboard/>
      </h1>
    </div>
  );
}