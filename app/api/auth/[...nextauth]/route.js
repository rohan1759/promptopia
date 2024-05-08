import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
//import GithubProvider from 'next-auth/providers/github';
import {connectToDB} from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID
        }),
        //GithubProvider({
        //    clientId: process.env.GITHUB_ID,
        //    clientSecret: process.env.GITHUB_SECRET
        //})
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }){
            try{
                await connectToDB();
                
                // Check if user already exists in the database
                const userExist = await User.findOne({
                    email: profile.email
                })
                
                //if not, create new user
                if(!userExist){
                    await User.create({
                        email: profile.email,
                        username: (profile.name || profile.login).replace(" ", "").toLowerCase(),
                        image: profile.picture || profile.avatar_url
                    })
                }               
                return true;
            }
            catch (error){
                console.error(`Error: ${error.message}`)
                return false;
            }
        }   
    }
})

export {handler as GET, handler as POST}