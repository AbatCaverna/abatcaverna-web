import Image from "next/image";
import styles from "./styles.module.css"
import { RiLockPasswordLine } from "react-icons/ri"
import { GiBatMask } from "react-icons/gi";
import MoradoresService from "../../../services/MoradoresService";

interface Perfil {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }
}

export default function Perfil({ user }: Perfil) {
  const moradoresService = new MoradoresService()

  async function handleChange() {
    await moradoresService.changePassword('Chapoca', 'vinicius1')
  }
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
        <div className={styles.container_center}>
          <h2>Trocar senha</h2>

          <div className={styles.input}>
            <label htmlFor="password"><RiLockPasswordLine/> Senha antiga</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className={styles.input}>
            <label htmlFor="new_password"> <RiLockPasswordLine/>Nova senha</label>
            <input type="password" name="new_password" id="new_password" />
          </div>

          <button type="button" onClick={handleChange}>Trocar</button>
        </div>
      </div>
    </div>
  );
}