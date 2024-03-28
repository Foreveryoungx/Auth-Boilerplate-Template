"use client";
import {CardWrapper} from '@/components/auth/card-wrapper';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useState, useTransition} from 'react';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {FormError} from '@/components/form-error';
import {FormSuccess} from '@/components/form-sucess';
import {newPassword} from '@/actions/new-password';
import {NewPasswordSchema} from '@/schemas';
import {useSearchParams} from "next/navigation"

export const NewPasswordForm = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        }
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('');
        setSuccess('');

        console.log(values)

        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });
    }
    return (
        <CardWrapper
            headerLabel={'Enter a new password'}
            backButtonLabel={'Back to login'}
            backButtonHref={'/auth/Login'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>
                    <div className={'space-y-4'}>
                        <FormField  control={form.control} name={"password"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} {...field} type={'password'} placeholder={"******"}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}/>
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type={'submit'} className={'w-full'}>
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}