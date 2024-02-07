import { type DefaultSession} from 'next-auth';
import {UserRole} from '@prisma/client';


export type ExtendedUser = DefaultSession['users'] & {
    role: UserRole
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}


