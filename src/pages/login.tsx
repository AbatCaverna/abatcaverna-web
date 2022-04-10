import { useSession,signOut, signIn } from 'next-auth/react'

export default function LoginPage() {
  const { data: session, status,  } = useSession()

  async function handleSignIn(user: string) {
    if (user === 'usuario') await signIn("google")

    if (user === 'cavernoso') await signIn(undefined, {
      callbackUrl: '/dashboard'
    })
  }
  
  if (status === "authenticated") {
    return (
      <>
        <div>
          <p>Signed in as {session?.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        
      </>
      

    )
  }

  return (
    <div>
      <h1>Com qual usuário quer fazer o login</h1>

      <div>
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