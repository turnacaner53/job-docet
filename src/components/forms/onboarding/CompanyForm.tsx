import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import { createCompany } from '@/app/actions';
import { UploadDropzone } from '@/components/global/UploadThingReexported';
import { countryList } from '@/utils/countriesList';
import { companySchema } from '@/utils/schemas';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function CompanyForm() {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      location: '',
      about: '',
      logo: '',
      website: '',
      xAccount: '',
    },
  });

  const [pending, setPending] = useState(false);

  async function onSubmit(data: z.infer<typeof companySchema>) {
    try {
      setPending(true);
      await createCompany(data);
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
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter company name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select location' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Worldwide</SelectLabel>
                      <SelectItem value='worldwide'>
                        <span>🌍</span>
                        <span>Worldwide / Remote</span>
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      {countryList.map((country) => (
                        <SelectItem
                          key={country.code}
                          value={country.name}
                          className='flex items-center'
                        >
                          <span>{country.flagEmoji}</span>
                          <span className='pl-2'>{country.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Website</FormLabel>
                <FormControl>
                  <Input placeholder='https://yourcompany.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='xAccount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>X (Twitter) Account</FormLabel>
                <FormControl>
                  <Input placeholder='@yourcompany' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='about'
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea placeholder='Tell us about your company...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='logo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                <div className=''>
                  {field.value ? (
                    <div className='relative w-fit'>
                      <Image
                        src={field.value}
                        alt='Company Logo'
                        width={100}
                        height={100}
                        className='rounded-lg'
                      />
                      <Button
                      onClick={()=>field.onChange('')}
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
                      endpoint={'imageUploader'}
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
