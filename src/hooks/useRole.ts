import { useSession } from "next-auth/react"

export default function useRole() {
  const { data } = useSession()

  if(data?.role !== "cavernoso") {
    return false
  }

  return true
}