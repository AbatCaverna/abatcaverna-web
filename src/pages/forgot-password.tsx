import { useRef, useState } from 'react'
import Head from 'next/head'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrocarSenha } from 'domain/Dashboard/SharedComponents'
import { RecoverPasswordService } from 'services'
import useAlert from 'hooks/useAlert'

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

      <Card className="max-w-lg mx-auto mt-8 mb-auto">
        <CardHeader>
          <CardTitle>Esqueci minha senha</CardTitle>
          <CardDescription>Para recuperar sua senha digite o código de recuperação:</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'code' && (
            <>
              <div className="flex w-full items-center space-x-2">
                <Input
                  name="code"
                  type="text"
                  ref={inputRef}
                  placeholder="************"
                  className="text-light-bg flex-1"
                />
                <Button type="submit" onClick={handleRecuperarSenha}>
                  Verificar
                </Button>
              </div>
            </>
          )}

          {step === 'password' && (
            <TrocarSenha hashCode={hashCode} />
          )}
        </CardContent>
      </Card>

    </div>
  )
}
