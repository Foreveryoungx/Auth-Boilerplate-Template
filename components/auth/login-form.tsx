import {CardWrapper} from '@/components/auth/card-wrapper';

export const LoginForm = () => {
    return (
        <CardWrapper
        headerLabel={'Welcome back'}
        backButtonLabel={'Dont have an account?'}
        backButtonHref={'/auth/register'}
        showSocial>
            Login Form
        </CardWrapper>
    )
}