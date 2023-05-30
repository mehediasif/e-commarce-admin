import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '../../../../lib/mongodb'
import { getServerSession } from "next-auth";

const adminEmails = ['mdhasanmehadi3898@gmail.com'];

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    //for example I have used google here
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Passwordless / email sign in
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session, token, user}) => {
      if( adminEmails.includes(session?.user?.email) ){
        return session;
      }
      else{
        return false;
      }
    },
  }
};

export default NextAuth(authOptions);

export async function isRequestFromAdmin(req,res){
  const session = await getServerSession(req,res, authOptions);
  if(!adminEmails.includes(session?.user?.email)){
    res.status(401);
    res.end();
  }
}