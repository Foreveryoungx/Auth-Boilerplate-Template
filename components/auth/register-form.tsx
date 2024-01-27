"use client";
import {CardWrapper} from '@/components/auth/card-wrapper';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {RegisterSchema} from '@/schemas';
import {useState, useTransition} from 'react';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {FormError} from '@/components/form-error';
import {FormSuccess} from '@/components/form-sucess';
import {register} from '@/actions/register';

export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }
    return (
        <CardWrapper
        headerLabel={'Create an account'}
        backButtonLabel={'Already have an account?'}
        backButtonHref={'/auth/login'}
        showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>
                    <div className={'space-y-4'}>
                        <FormField  control={form.control} name={'name'} render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} {...field}  placeholder={"John Doe"}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                            </FormItem>
                        )}/>
                        <FormField  control={form.control} name={'email'} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                    <Input disabled={isPending} {...field} type={'email'} placeholder={"any@example.com"}/>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                </FormItem>
                        )}/>
                        <FormField  control={form.control} name={'password'} render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} {...field} type={'password'} placeholder={"********"}/>
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}/>
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type={'submit'} className={'w-full'}>
                        Create account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}