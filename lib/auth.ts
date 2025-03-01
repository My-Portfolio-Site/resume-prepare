import Google from "next-auth/providers/google"
import NextAuth from "next-auth"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({account, profile}) {
      if (account?.provider === "google") {
        console.log("signIn", profile?.email)
        return profile?.email_verified ? true : "/login"
      }
      return true
    }
  }
})