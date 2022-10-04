import { useRef } from 'react'
import Head from 'next/head'

import { Button, Card, Input } from 'components/Shared'
import styles from 'styles/ForgotPassword.module.css'

export default function ForgotPasswordPage() {
  const emailRef = useRef<HTMLInputElement>(null)

  function handleRecuperarSenha() {
    if (emailRef.current && emailRef.current.value) {
      alert('Recuperar senha')
    }
  }

  return (
    <div>
      <Head>
        <title>AbatCaverna | Esqueci minha senha</title>
        <meta name="description" content="Pagina de recuperacao de senha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card>
        <div className={styles.card_content}>
          <h1>Esqueci minha senha</h1>
          <p>Para recuperar sua senha digite seu e-mail abaixo:</p>
          <Input
            name="email"
            type="email"
            ref={emailRef}
            placeholder="example@email.com"
            inputStyle="large"
          />
          <Button type="button" onClick={handleRecuperarSenha}>Recuperar</Button>
        </div>
      </Card>

    </div>
  )
}