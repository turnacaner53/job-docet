import React from 'react';

import Link from 'next/link';

import { deleteJobPost } from '@/app/actions';
import { GeneralSubmitButton } from '@/components/global/SubmitButtons';
import { requireUser } from '@/utils/requireUser';
import { ArrowLeft, Trash } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Params = Promise<{ jobId: string }>;

export default async function DeleteJobPage({ params }: { params: Params }) {
  await requireUser();

  const { jobId } = await params;

  return (
    <div>
      <Card className='mx-auto mt-16 max-w-lg'>
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
          <CardDescription>
            Are you sure you want to delete this job? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex items-center justify-between'>
          <Link href={`/my-jobs`} className={buttonVariants({ variant: 'outline' })}>
            <ArrowLeft /> Cancel
          </Link>

          <form
            action={async () => {
              'use server';
              await deleteJobPost(jobId);
            }}
          >
            <GeneralSubmitButton text='Delete Job' variant='destructive' icon={<Trash />} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
