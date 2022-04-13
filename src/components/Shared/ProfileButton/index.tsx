import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";

type ProfileButton = {
  name: string,
  image: string
  role?: string
}
export default function ProfileButton({ name, image, role = "usuario" }: ProfileButton) {
  const [showDropdown, setShowDropdown] = useState(false)
  function hadleOpenDropdow () {
    
    setShowDropdown(!showDropdown)
  }
  
  async function handleLogOut() {
    await signOut({ callbackUrl: '/' })
  }




  return (
    <div className={styles.hover_area}>
      <div onClick={hadleOpenDropdow} className={`${styles.container} ${styles.container_styles}`}>
        <Image src={`${image}`} alt="User" width={32} height={32} />
        <p>{name}</p>
      {showDropdown && (
        <div className={`${styles.dropdown}`}>
          <ul>
          <li className={styles.container_styles}>
              <Link href={role === "cavernoso" ? "/dashboard" : "/perfil"}>
                <a >{role === "cavernoso" ? "Dashboard" : "Perfil"}</a>
              </Link>
            </li>
            <li onClick={handleLogOut} className={styles.container_styles}>Sair</li>
          </ul>
        </div>
      )}

      </div>

    </div>

  );
}