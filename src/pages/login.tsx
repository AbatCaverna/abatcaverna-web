import { useSession,signOut  } from 'next-auth/react'
import Link from 'next/link'

export default function LoginPage() {
  const { data: session, status,  } = useSession()

  if (status === "authenticated") {
    return (
      <div>
        <p>Signed in as {session?.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>

    )
  }

  return (
    <div>
      <h1>Authenticate</h1>
      <Link href="/api/auth/signin">
        <a>Sign in</a>
      
      </Link>
    </div>
  )
}