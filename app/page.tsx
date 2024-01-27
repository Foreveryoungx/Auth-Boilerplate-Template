import { Button} from "@/components/ui/button";
import { Poppins} from "next/font/google";
import {cn} from "@/lib/utils";
import {LoginButton} from '@/components/auth/login-button';

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

export default function Home() {
  return (
    <main className={'flex h-full flex-col items-center justify-center bg-gray-500'}>
      <div className={'space-y-6'}>
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className,)}>
         🔐 Auth
        </h1>
          <p className={'text-white text-lg'}>
              A Next.js template with authentication
          </p>
          <LoginButton>
              <div>
                  <Button variant={'secondary'} size={'lg'}>Sign in</Button>
              </div>
          </LoginButton>

      </div>
    </main>
  );
}
