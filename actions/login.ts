"use server";

import {LoginSchema} from '@/schemas';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedfeilds = LoginSchema.safeParse(values);

    if (!validatedfeilds.success) {
        return {error: "Invalid fields"};
    }

    return {success: "Email sent!"};
}