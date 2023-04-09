import { useSession } from "next-auth/react";
import { useEffect } from "react";

function useSessionToStorage() {
  const session = useSession()

  useEffect(() => {
    if (session && localStorage) {
      localStorage.setItem('session', JSON.stringify(session.data))
    }
  }, [session])
}

export default useSessionToStorage
