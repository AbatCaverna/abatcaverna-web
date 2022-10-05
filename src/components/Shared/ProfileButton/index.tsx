import LogRocket from "logrocket";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type ProfileButton = {
  name: string
  image: string
  email: string
  role?: string
}
export default function ProfileButton({ name, image, role = "usuario", email }: ProfileButton) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  function hadleOpenDropdow () {
    
    setShowDropdown(!showDropdown)
  }
  
  async function handleLogOut() {
    await signOut({ callbackUrl: '/' })
  }


  useEffect(() => {
    // This is an example script - don't forget to change it!
    if (process.env.NODE_ENV === 'production') {
      LogRocket.identify(email, {
        name,
        email,
  
        // Add your own custom user variables here, ie:
        subscriptionType: 'pro'
      });
    }

  }, [email, name])

  //close the dropdown when click outside of it
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (showDropdown) {
          setShowDropdown(!showDropdown)
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, showDropdown]);

  return (
    <div ref={dropdownRef}>
      <div onClick={hadleOpenDropdow} className={`${styles.container} ${styles.container_item_styles}`}>
        <Image src={`${image}`} alt="User" width={32} height={32} />
        <p>{name}</p>
      {showDropdown && (
        <div className={`${styles.dropdown}`}>
          <ul>
            <li className={styles.container_item_styles}>
              <Link href={role === "cavernoso" ? "/dashboard" : "/perfil"}>
                <a >{role === "cavernoso" ? "Dashboard" : "Perfil"}</a>
              </Link>
            </li>
            <li onClick={handleLogOut} className={styles.container_item_styles}>Sair</li>
          </ul>
        </div>
      )}
      </div>
    </div>

  );
}