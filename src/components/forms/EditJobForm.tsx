'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import { countryList } from '@/utils/countriesList';
import { jobSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import { z } from 'zod';

import BenefitSelector from '../global/BenefitSelector';
import SalaryRangeSelector from '../global/SalaryRangeSelector';
import { UploadDropzone } from '../global/UploadThingReexported';
import { JobDescriptionEditor } from '../rich-text-editor/JobDescriptionEditor';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { editJobPost } from '@/app/actions';

interface EditJobFormProps {
  jobPost: {
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
    jobDescription: string;
    listingDuration: number;
    benefits: string[];
    id: string;
    Company: {
      location: string;
      xAccount: string | null;
      name: string;
      website: string;
      logo: string;
      about: string;
    };
  };
}

export default function EditJobForm({ jobPost }: EditJobFormProps) {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      benefits: jobPost.benefits,
      companyName: jobPost.Company.name,
      companyLocation: jobPost.Company.location,
      companyLogo: jobPost.Company.logo,
      companyWebsite: jobPost.Company.website,
      companyAbout: jobPost.Company.about,
      companyXAccount: jobPost.Company.xAccount || '',
      employmentType: jobPost.employmentType,
      jobDescription: jobPost.jobDescription,
      jobTitle: jobPost.jobTitle,
      location: jobPost.location,
      listingDuration: jobPost.listingDuration,
      salaryFrom: jobPost.salaryFrom,
      salaryTo: jobPost.salaryTo,
    },
  });

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
   try {
        setPending(true);
        await editJobPost(values, jobPost.id);
      } catch (error) {
        if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
          console.error('Something went wrong');
        }
      } finally {
        setPending(false);
      }
    };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='col-span-1 flex flex-col gap-4 lg:col-span-2'
      >
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='jobTitle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Job title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='employmentType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Employment Type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className='text-muted-foreground'>
                            Employment Type
                          </SelectLabel>
                          <SelectItem value='full-time'>Full Time</SelectItem>
                          <SelectItem value='part-time'>Part Time</SelectItem>
                          <SelectItem value='contract'>Contract</SelectItem>
                          <SelectItem value='internship'>Internship</SelectItem>
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
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Location' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className='text-muted-foreground'>Worldwide</SelectLabel>
                          <SelectItem value='wordwide'>
                            <span>🌍</span>
                            <span className='pl-2'>Worldwide / Remote</span>
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

              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <SalaryRangeSelector
                    control={form.control}
                    minSalary={10000}
                    maxSalary={1000000}
                    step={1000}
                    currency='USD'
                  />
                </FormControl>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name='jobDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='benefits'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <BenefitSelector field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='companyName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Company Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='companyLocation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Location' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className='text-muted-foreground'>Worldwide</SelectLabel>
                          <SelectItem value='wordwide'>
                            <span>🌍</span>
                            <span className='pl-2'>Worldwide / Remote</span>
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
                name='companyWebsite'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input placeholder='Company Website' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='companyXAccount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company X Account</FormLabel>
                    <FormControl>
                      <Input placeholder='Company X Account' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='companyAbout'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Say Something about company'
                      {...field}
                      className='min-h-[120px]'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='companyLogo'
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
          </CardContent>
        </Card>

        <Button type='submit' className='w-full' disabled={pending}>
          {pending ? 'Editing Job Post...' : 'Edit Job Post'}
        </Button>
      </form>
    </Form>
  );
}
