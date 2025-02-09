import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/../public/logo.png';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link href='/' className='flex items-center gap-2 self-center'>
          <Image src={Logo} alt='Logo' className='size-10' />
          <h1 className='text-2xl font-bold'>
            Job<span className='text-primary'>Docet</span>
          </h1>
        </Link>
        {children}
      </div>
    </div>
  );
}
