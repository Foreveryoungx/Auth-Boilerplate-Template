"use client";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {Button} from '@/components/ui/button';

export const Social = () => {
    return (
        <div className={"flex items-center w-full gap-x-2"}>
            <Button size={'lg'} className={'w-full'} variant={'outline'} onClick={() => {}}>
                <FcGoogle className={'h-5 w-5'}/>
            </Button>
            <p className={'text-sm text-gray-400'}>or</p>
            <Button size={'lg'} className={'w-full'} variant={'outline'} onClick={() => {}}>
                <FaGithub className={'h-5 w-5'}/>
            </Button>
        </div>
    )
}