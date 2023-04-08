import { useSession } from "next-auth/react"

export default function useRole() {
  const { data } = useSession()

  if((data as any)?.role !== "cavernoso") {
    return null
  }

  return data?.user
}