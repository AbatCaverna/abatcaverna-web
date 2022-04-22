import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import SessionController from "../../../../backend/Controller/SessionController"
import connectMongo from "../../../../backend/Providers/mongo";
import { Role } from "../../../utils/enum";

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
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { database } = await connectMongo()

        if (!database) return null

        const sessionController = new SessionController(database)

        const user = await sessionController.moradorSession(credentials!.username, credentials!.password)
        console.log('[SERVER]: user logged in', user)
        // If no error and we have user data, return it
        if (user) {
          return {
            name: user.apelido,
            email: user.nome,
            image: user.imagem,
            token: user.token,
            role: Role.cavernoso
          }
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const { database } = await connectMongo()

      if (!database) return false
      
      const sessionController = new SessionController(database)
      console.log('[SERVER]: user logged in', user)
      // Check if the user is current in the database
      // if not, we create it and returns true if it is ok]
      if (user.role === Role.usuario) {
        const currentUser = {
          name: user.name || '',
          email: user.email || '',
          image: user.image || ''
        }

        const response = await sessionController.index(currentUser)
        return response
      }

      return true

    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      return baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.accessToken = user.token
        token.role = user.role
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return {
        ...session,
        role: token.role
      }
    }
  },
})
