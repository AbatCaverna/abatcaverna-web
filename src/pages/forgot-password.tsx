import { useRef, useState } from 'react'
import Head from 'next/head'

import { Button, Card, Input } from 'components/Shared'
import { RecoverPasswordService } from 'services'
import TrocarSenha from 'components/Dashboard/TrocarSenha'
import useAlert from 'hooks/useAlert'

import styles from 'styles/ForgotPassword.module.css'

export default function ForgotPasswordPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const revocerService = new RecoverPasswordService()
  const [step, setStep] = useState<'code' | 'password'>('code')
  const [hashCode, setHashCode] = useState<string | undefined>(undefined)
  const { setAlert } = useAlert()

  async function handleRecuperarSenha() {
    if (inputRef.current && inputRef.current.value) {
      try {
        const response = await revocerService.checkRecoverCode(inputRef.current.value)

        if (response.status === 200) {
          setHashCode(response.data.hashCode)
          setStep('password')
        } else {
          setAlert({
            message: 'Nao verificado',
            type: "error"
          })
        }
        
      } catch (error) {
        setAlert({
          message: 'Nao verificado',
          type: "error"
        })
      }
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
          {step === 'code' && (
            <>
              <h1>Esqueci minha senha</h1>
              <p>Para recuperar sua senha digite o código de recuperação:</p>
              <Input
                name="email"
                type="text"
                ref={inputRef}
                placeholder="************"
                inputStyle="large"
              />
              <Button type="button" onClick={handleRecuperarSenha}>Recuperar</Button> 
            </>
          )}

          {step === 'password' && (
            <TrocarSenha hashCode={hashCode} />
          )}
        </div>
      </Card>

    </div>
  )
}