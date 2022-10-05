import { useRef, useState } from "react"
import { useRouter } from "next/router"
import { RiLockPasswordLine } from "react-icons/ri"

import { Button, Input } from "components/Shared"
import MoradoresService from "services/MoradoresService"

import styles from "./styles.module.css"

interface Props {
  name?: string
  hashCode?: string
}

export default function TrocarSenha({ name, hashCode }: Props) {
  const router = useRouter()
  const moradoresService = new MoradoresService()
  const [loading, setLoading] = useState(false)
  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  async function handleChange() {
    if (oldPasswordRef.current && newPasswordRef.current) {

      if (oldPasswordRef.current.value !== newPasswordRef.current.value) {
        alert("As senhas devem ser iguais")
        return
      }

      if (oldPasswordRef.current.value.length === 0 || newPasswordRef.current.value.length === 0) {
        alert("As senhas nao podem estar vazias")
        return
      }

      setLoading(true)
      try {
        await moradoresService.changePassword(name ?? nameRef.current!.value, newPasswordRef.current.value, hashCode)
        
        alert("Senha alterada com sucesso")
        
        if (router.pathname === '/forgot-password') {
          router.push('/login')
        }

      } catch (error) {
        alert("Algo deu errao na troca de senha")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className={styles.container_center}>
      <h2>Trocar senha</h2>
      
      {!name && (
        <Input
          type="text"
          name="name"
          label="Nome"
          ref={nameRef}
        />
      )}

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

      <Button type="button" loading={loading} onClick={handleChange}>Trocar</Button>
    </div>
  )
}