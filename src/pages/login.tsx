import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'

import styles from 'styles/Login.module.css'

export default function LoginPage() {

  async function handleSignIn(user: string) {
    if (user === 'usuario') await signIn("google", {
      callbackUrl: '/perfil'
    })

    if (user === 'cavernoso') await signIn(undefined, {
      callbackUrl: '/dashboard'
    })
  }

  return (
    <div className={styles.container}>
      
      <Head>
        <title>ABatCaverna | Login</title>
      </Head>

      <div className={styles.btn_container}>
        <h1>Com qual usuário quer fazer o login?</h1>
        
        <div>
          <button
            type="button"
            className={styles.btn}
            onClick={() => handleSignIn('usuario')}
          >
            Usuário
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => handleSignIn('cavernoso')}
          >
            Morador
          </button>
        </div>
       

      </div>
      <Link href="/forgot-password">
        <a>Esqueci minha senha</a>
      </Link>
    </div>
  )
}