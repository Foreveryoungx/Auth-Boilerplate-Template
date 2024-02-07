import type { NextAuthConfig } from 'next-auth';
import Credentials from '@auth/core/providers/credentials';

import { LoginSchema} from '@/schemas';
import {getUserByEmail} from '@/data/user';
import bcrypt from 'bcryptjs';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import Apple from '@auth/core/providers/apple';

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,

        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Apple,
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if(validatedFields.success){
                    const {email, password} = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(
                        password, user.password
                    );

                    if(passwordMatch) return user;
                }

                return null;
            }
        }),
    ],
} satisfies NextAuthConfig;