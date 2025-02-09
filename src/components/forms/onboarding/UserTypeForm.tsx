import React from 'react';

import { Building2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type UserSelectionType = 'company' | 'jobSeeker' | null;

interface UserTypeSelectionProps {
  onSelect: (type: UserSelectionType) => void;
}

export default function UserTypeSelection({ onSelect }: UserTypeSelectionProps) {
  return (
    <div className='space-y-8'>
      <div className='space-y-2 text-center'>
        <h2>Welcome! Lets get started</h2>
        <p className='text-muted-foreground'>Please select the type of user you are.</p>
      </div>

      <div className='grid gap-4'>
        <Button
        onClick={()=>onSelect('company')}
          variant={'outline'}
          className='h-auto w-full items-center gap-4 border-2 p-6 transition-all duration-200 hover:border-primary hover:bg-primary/5'
        >
          <div className='flex size-12 items-center justify-center rounded-full bg-primary/10'>
            <Building2 className='size-6 text-primary' />
          </div>
          <div className='text-left'>
            <h3 className='text-lg font-semibold'>Comany / Organization</h3>
            <p>Post jobs and find exceptional talent</p>
          </div>
        </Button>
        <Button
        onClick={()=>onSelect('jobSeeker')}
          variant={'outline'}
          className='h-auto w-full items-center gap-4 border-2 p-6 transition-all duration-200 hover:border-primary hover:bg-primary/5'
        >
          <div className='flex size-12 items-center justify-center rounded-full bg-primary/10'>
            <Building2 className='size-6 text-primary' />
          </div>
          <div className='text-left'>
            <h3 className='text-lg font-semibold'>Job Seeker</h3>
            <p>Post jobs and find exceptional talent</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
