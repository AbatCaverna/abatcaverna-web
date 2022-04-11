import { signIn } from 'next-auth/react'
import styles from '../styles/Login.module.css'

export default function LoginPage() {

  async function handleSignIn(user: string) {
    if (user === 'usuario') await signIn("google")

    if (user === 'cavernoso') await signIn(undefined, {
      callbackUrl: '/dashboard'
    })
  }

  return (
    <div className={styles.container}>
      <h1>Com qual usuário quer fazer o login</h1>

      <div className={styles.btn_container}>
        <button
          type="button"
          onClick={() => handleSignIn('usuario')}
        >Usuário</button>
        <button
          type="button"
          onClick={() => handleSignIn('cavernoso')}
        >Morador</button>

      </div>

    </div>
  )
}