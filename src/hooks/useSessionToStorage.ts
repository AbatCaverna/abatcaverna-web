import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Cookies from 'js-cookie'
function useSessionToStorage() {
  const session = useSession()

  useEffect(() => {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session.data))
      Cookies.set('session', JSON.stringify(session.data))
    }
  }, [session])
}

export default useSessionToStorage
