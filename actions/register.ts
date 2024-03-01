"use server";

import {RegisterSchema} from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import {db} from '@/lib/db';
import {getUserByEmail} from '@/data/user';
import {generateVerificationToken} from '@/lib/tokens';
import {sendVerificationEmail} from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields"};
    }

    const {email,name,password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email);


    if(existingUser) {
        return {error: "Email already in use"};
    }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        },
    });

    const verificationToken = await generateVerificationToken(email);

    // TODO: Send email

    await sendVerificationEmail(verificationToken.email, verificationToken.email)

    return {success: "Confirmation email sent"};
}