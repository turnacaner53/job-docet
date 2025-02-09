import React from 'react';

import Link from 'next/link';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { requireUser } from '@/utils/requireUser';

export default async function CancelPage() {
await requireUser();

  return (
    <div className='flex min-h-screen w-full flex-1 items-center justify-center'>
      <Card className='w-[350px] sm:w-[450px]'>
        <div className='p-6'>
          <div className='flex w-full justify-center'>
            <X className='size-12 rounded-full bg-red-500/30 p-2 text-red-500' />
          </div>
          <div className='mt-3 w-full text-center sm:mt-5'>
            <h2 className='text-xl font-semibold'>Payment Cancelled</h2>
            <p className='mt-2 text-balance text-sm tracking-tight text-muted-foreground'>
              Your payment has been cancelled. Please try again.
            </p>

            <Button asChild className='mt-5 w-full'>
              <Link href='/'>Go Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
