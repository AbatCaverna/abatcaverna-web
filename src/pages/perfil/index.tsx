import Image from 'next/image'
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { FiShoppingBag } from "react-icons/fi";
import styles from '../../styles/Perfil.module.css'

export default function PerfilPage() {
  const session = useSession()

  if (session.status !== "authenticated") {
    return (
      <h1>Faça login para ver seu perfil</h1>
    )
  }

  const { user } = session.data

  return (
    <div>
      <div className={styles.container}>
        <h1>Perfil</h1>
        <div className={styles.profile_image}>
          <Image src={user?.image!} alt={user?.name!} layout="fill" />
        </div>
        <div>
          <p>{user?.email}</p>
        </div>
        <div>
          {user?.name}
        </div>
        
      </div>
    </div>
  )
}