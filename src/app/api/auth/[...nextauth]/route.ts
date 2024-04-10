import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '@/app/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        }),
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'test@gmail.com' },
                password: { label: 'Password', type: 'password' },
                name: { label: 'UserName', type: 'text' },
            },
            async authorize(credentials, req) {
                await mongoose.connect(String(process.env.MONGO_URL));

                try {
                    const email = credentials?.email;
                    const password = credentials?.password;

                    const user = await User.findOne({ email });

                    if (user) {
                        const passwordOk = bcrypt.compareSync(String(password), user.password);
                        if (passwordOk) {
                            return user;
                        }
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
