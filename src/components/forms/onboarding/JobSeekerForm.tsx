import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import PdfImage from '@/../public/pdf.png';
import { createJobSeeker } from '@/app/actions';
import { UploadDropzone } from '@/components/global/UploadThingReexported';
import { jobSeekerSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function JobSeekerForm() {
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: '',
      about: '',
      resume: '',
    },
  });

  const [pending, setPending] = useState(false);

  async function onSubmit(data: z.infer<typeof jobSeekerSchema>) {
    try {
      setPending(true);
      await createJobSeeker(data);
    } catch (error) {
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        console.error('Something went wrong');
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your full name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='about'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea placeholder='Tell us about yourself' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='resume'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className='relative w-fit'>
                      <Image
                        src={PdfImage}
                        alt='Pdf resume image'
                        width={100}
                        height={100}
                        className='rounded-lg'
                      />
                      <Button
                        onClick={() => field.onChange('')}
                        className='absolute -right-2 -top-2'
                        size='icon'
                        type='button'
                        variant='destructive'
                      >
                        <XIcon className='size-4' />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint={'resumeUploader'}
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                      }}
                      onUploadError={() => {
                        console.error('Something went wrong');
                      }}
                      className='border-primary ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-allowed-content:text-muted-foreground ut-label:text-muted-foreground'
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={pending} className='w-full'>
          {pending ? 'Submitting...' : 'Continue'}
        </Button>
      </form>
    </Form>
  );
}
