import Image from "next/image";

import TrocarSenha from "../TrocarSenha";

import styles from "./styles.module.css"
interface Perfil {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }
}

export default function Perfil({ user }: Perfil) {
  return (
    <div>
      <h1>Perfil</h1>
      <div className={styles.container_center}>
        <div className={styles.profile_image}>
          <Image src={user.image!} alt={user.name!} layout="fill" />
        </div>
        <div>
          <p>{user.name} | {user.email}</p>
        </div>
        <TrocarSenha name={user.name!} />
      </div>
    </div>
  );
}