export const runtime = 'edge'

import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
// import { getRequestContext } from '@cloudflare/next-on-pages';

import { getDatabase } from "./db"
import { createUser, updateUser } from "./db_insert";
import { findUser } from "./db_query";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow sign-in if the user is in the database
      try {
        // Get D1 database instance
        const db = await getDatabase()

        // Check if user exists in database
        const existingUser = await findUser(user.email || '');
        

        if (!existingUser) {
          console.log(`User ${user.email} not found in database`);
          return `/login?error=AccessDenied`;  // Redirect with error
        }
        user.id = existingUser.id
        if(!existingUser.name || !existingUser.image){
          console.log('Updating user: ', existingUser);
          await updateUser(db, user.name || '', user.email || existingUser.email, user.image || '')
        }
        
        return true; // Allow sign-in
      } catch (error) {
        console.error("Database error during sign-in:", error);
        return `/login?error=DatabaseError`; // Redirect with different error
      }
    },
    async session({ session, token, user }) {
      // Add user data from the token to the session
      // console.log('auth user:', session, token, user);

      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        token.accessToken = account.access_token;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  }
})