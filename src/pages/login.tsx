import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  const [openTab, setOpenTab] = useState('usuario')

  async function handleSignIn(user: string) {
    if (user === 'usuario') await signIn("google", {
      callbackUrl: '/perfil'
    })

    if (user === 'cavernoso') await signIn(undefined, {
      callbackUrl: '/dashboard'
    })
  }

  return (
    <div>
      <Head>
        <title>ABatCaverna | Login</title>
      </Head>
      <Tabs className="mt-8 max-w-lg mx-auto" defaultValue="usuario" value={openTab} onValueChange={setOpenTab}>
        <TabsList className="w-full grid grid-cols-2 bg-light-gray text-black">
          <TabsTrigger className="data-[state=active]:bg-light-bg data-[state=active]:text-white px-8" value="usuario">Usuário</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-light-bg data-[state=active]:text-white px-8" value="cavernoso">Morador</TabsTrigger>
        </TabsList>
        <TabsContent value="usuario">
          <Card>
            <CardHeader>
              <CardTitle>Usuário</CardTitle>
              <CardDescription>
                Faça login utilizando sua conta do Google, sem necessidade de criar uma conta no site.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                className="text-2xl uppercase font-light"
                size="lg"
                onClick={() => handleSignIn('usuario')}
              >
                Usuário
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cavernoso">
          <Card>
            <CardHeader>
              <CardTitle>Morador</CardTitle>
              <CardDescription>
                Entre usando o login e senha cadastrados.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                className="text-2xl uppercase font-light"
                size="lg"
                onClick={() => handleSignIn('cavernoso')}
              >
                Morador
              </Button>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <Link href="/forgot-password">
                Esqueci minha senha
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
