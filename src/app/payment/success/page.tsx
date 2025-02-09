import React from 'react';

import { Check } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { requireUser } from '@/utils/requireUser';

export default async function SuccessPage() {
  await requireUser();
  
  return (
    <div className='flex min-h-screen w-full flex-1 items-center justify-center'>
      <Card className='w-[350px] sm:w-[450px]'>
        <div className='p-6'>
          <div className='flex w-full justify-center'>
            <Check className='size-12 rounded-full bg-green-500/30 p-2 text-green-500' />
          </div>
          <div className='mt-3 w-full text-center sm:mt-5'>
            <h2 className='text-xl font-semibold'>Payment Successfull</h2>
            <p className='mt-2 text-sm tracking-tight text-muted-foreground text-balance'>
              Congratulations! Your payment has been processed successfully. Thank you for your
              purchase.
            </p>

            <Button asChild className='w-full mt-5'>
                <Link href='/'>Go Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
