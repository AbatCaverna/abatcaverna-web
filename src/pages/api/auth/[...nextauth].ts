import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

import { Role } from "utils/enum"
import { SessionService } from "services"

export default NextAuth({
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#FFC74A", // Hex color code
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'morador',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "abat" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials) return null

        const response = await SessionService.loginMorador(credentials.username, credentials.password)
        console.log(response)

        if (response) {
          console.log('[SERVER]: user logged in', response)

          const { user } = response.data

          return {
            name: user.nome,
            email: user.email,
            image: user.imagem,
            token: user.token,
            role: user.role
          }
        }

        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if the user is current in the database
      // if not, we create it and returns true if it is ok]
      if (user) return true

      return true

    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      return baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if ((user as any).role === undefined) {
          const currentUser = {
            name: user.name || '',
            email: user.email || '',
            image: user.image || '',
            role: Role.usuario
          }

          const response = await SessionService.loginUser(currentUser)
          console.log('user logged', response.data)

          token.accessToken = response.data.user.token
          token.role = currentUser.role
          return token
        } else {
          token.accessToken = (user as any).token
          token.role = (user as any).role
        }

      }
      return token
    },
    async session({ session, token, user }) {
      (session as any).accessToken = token.accessToken
      return {
        ...session,
        role: token.role
      }
    }
  },
})
