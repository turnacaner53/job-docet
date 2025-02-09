import React from 'react';

import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function JobListingsLoading() {
  return (
    <div className='flex flex-col gap-6'>
      {[...Array(4)].map((item, index) => (
        <Card key={index} className='p-6'>
          <div className='flex items-start gap-4'>
            <Skeleton className='size-14 rounded p-6' />

            <div className='flex-1 space-y-3'>
              <Skeleton className='h-5 w-[300px]' />
              <Skeleton className='h-5 w-[200px]' />

              <div className='mt-4 flex gap-4'>
                <Skeleton className='h-4 w-[120px]' />
                <Skeleton className='h-4 w-[120px]' />
                <Skeleton className='h-4 w-[120px]' />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
