import { redirect } from 'next/navigation';

import { auth, signIn } from '@/utils/auth';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import GithubIcon from '../icons/GithubIcon';
import GoogleIcon from '../icons/GoogleIcon';
import { GeneralSubmitButton } from '../global/SubmitButtons';

export default async function LoginForm() {
  const session = await auth();
  
  if (session?.user) return redirect('/');

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome Back</CardTitle>
          <CardDescription>Login with your Google or Github Account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <form
              action={async () => {
                'use server';
                await signIn('github', { redirectTo: '/onboarding' });
              }}
            >
              <GeneralSubmitButton
                variant='outline'
                text='Login with Github'
                className='w-full'
                icon={<GithubIcon />}
              />
            </form>
            <form
              action={async () => {
                'use server';
                await signIn('google', { redirectTo: '/onboarding' });
              }}
            >
              <GeneralSubmitButton
                variant='outline'
                text='Login with Google'
                className='w-full'
                icon={<GoogleIcon />}
              />
            </form>
          </div>
        </CardContent>
      </Card>

      <div className='text-balance text-center text-xs text-muted-foreground'>
        By signing in, you agree to our <span className='text-blue-500'>Terms of Service</span> and{' '}
        <span className='text-blue-500'>Privacy Policy</span>
      </div>
    </div>
  );
}
