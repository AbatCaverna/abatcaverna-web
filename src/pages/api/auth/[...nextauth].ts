import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import SessionController from "../../../../backend/Controller/SessionController"
import connectMongo from "../../../../backend/Providers/mongo";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const { clientPromise } = connectMongo()
      const database = (await clientPromise).db('abatcaverna')
      const sessionController = new SessionController(database)
      const currentUser = {
        name: user.name || '',
        email: user.email || '',
        image: user.image || ''
      }
      const response = await sessionController.index(currentUser)
      return response
    },
  }
})
