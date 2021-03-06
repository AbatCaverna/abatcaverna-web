import Image from "next/image";
import styles from "./styles.module.css"
import { RiLockPasswordLine } from "react-icons/ri"
import { GiBatMask } from "react-icons/gi";
import MoradoresService from "../../../services/MoradoresService";
import { useRef } from "react";
import Input from "../../Shared/Input";

interface Perfil {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }
}

export default function Perfil({ user }: Perfil) {
  const moradoresService = new MoradoresService()
  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)

  async function handleChange() {
    if (oldPasswordRef.current && newPasswordRef.current) {

      if (oldPasswordRef.current.value !== newPasswordRef.current.value) {
        alert("As senhas devem ser iguais")
        return
      }

      await moradoresService.changePassword(user.name!, newPasswordRef.current.value)
      alert("Senha alterada com sucesso")
    }
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
          <Input
            type="password"
            name="password"
            label="Nova senha"
            icon={RiLockPasswordLine}
            ref={oldPasswordRef}
          />

          <Input
            type="password"
            name="new_password"
            label="Confirmar senha"
            icon={RiLockPasswordLine}
            ref={newPasswordRef}
          />

          <button type="button" onClick={handleChange}>Trocar</button>
        </div>
      </div>
    </div>
  );
}