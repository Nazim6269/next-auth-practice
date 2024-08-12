import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import CredntialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { userModel } from './app/models/userModel';
import { connectDB } from './lib/connctDB';
import mongoClientPromise from './lib/mongoClientPromise';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredntialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          connectDB();
          const user = await userModel.findOne({ email: credentials?.email });
          if (user) {
            const isMatch = user?.password === credentials.password;

            if (isMatch) {
              return user;
            } else {
              throw new Error('Email or Password is not correct');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (error) {}
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
});
