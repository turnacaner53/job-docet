'use client';

import React from 'react';

import Link from 'next/link';

import { Ban, PlusCircle } from 'lucide-react';

import { buttonVariants } from '../ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href?: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  href = '/',
}: EmptyStateProps) {
  return (
    <div className='flex h-full flex-1 flex-col items-center justify-center rounded-md border border-dashed border-primary/30 p-8'>
      <div className='flex size-20 items-center justify-center rounded-full bg-primary/10'>
        <Ban className='size-10 text-primary' />
      </div>

      <h2 className='mt-6 text-xl font-semibold'>{title}</h2>
      <p className='mb-8 mt-2 max-w-sm text-balance text-center text-sm leading-tight text-muted-foreground'>
        {description}
      </p>

      <Link href={href} className={buttonVariants()}>
        <PlusCircle />
        {buttonText}
      </Link>
    </div>
  );
}
