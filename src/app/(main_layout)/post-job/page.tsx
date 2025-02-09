import React from 'react';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import ArcjetLogo from '@/../public/arcjet.jpg';
import InngestLogo from '@/../public/inngest-locale.png';
import CreateJobForm from '@/components/forms/CreateJobForm';
import { prisma } from '@/utils/db';
import { requireUser } from '@/utils/requireUser';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const companies = [
  { id: 0, name: 'Arcjet', logo: ArcjetLogo },
  { id: 1, name: 'Inngest', logo: InngestLogo },
  { id: 2, name: 'Arcject', logo: ArcjetLogo },
  { id: 3, name: 'Inngest', logo: InngestLogo },
  { id: 4, name: 'Arcjet', logo: ArcjetLogo },
  { id: 5, name: 'Inngest', logo: InngestLogo },
];

const testimonials = [
  {
    quote: 'I love this platform! It has helped me find the best talent for my team.',
    author: 'John Doe',
    company: 'StartXY',
  },
  {
    quote: 'This is the best platform for finding a job. I found my dream job here.',
    author: 'Jane Doe',
    company: 'ExTwitter',
  },
  {
    quote: 'Wow this platform is amazing. I found the best talent for my team.',
    author: 'John Doe',
    company: 'SpaceY',
  },
  {
    quote: 'Higly recommend this platform. Best platform for finding a job.',
    author: 'Jane Doe',
    company: 'BYDD',
  },
];

const stats = [
  { id: 0, value: '10k+', label: 'Monthly active job seekers' },
  { id: 1, value: '48h', label: 'Average time to hire' },
  { id: 2, value: '95%', label: 'Employeer satisfaction rate' },
  { id: 3, value: '500+', label: 'Companies hiring remotely' },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: { userId: userId },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) redirect('/');

  return data;
}

export default async function PostJobPage() {
  const session = await requireUser();

  const data = await getCompany(session?.id as string);

  return (
    <div className='mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3'>
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyName={data.name}
        companyLogo={data.logo}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />

      <div className='col-span-1'>
        <Card className='col-span-1 lg:col-span-2'>
          <CardHeader>
            <CardTitle className='text-xl'>Trusted by Industry Leaders</CardTitle>
            <CardDescription>Join thousands of companies hiring top talent</CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Company Logos */}
            <div className='grid grid-cols-3 gap-4'>
              {companies.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className='rounded-lg opacity-75 transition-opacity hover:opacity-100'
                  />
                </div>
              ))}
            </div>

            <div className='space-y-4'>
              {testimonials.map((testimonial, index) => (
                <blockquote className='border-l-2 border-primary pl-4' key={index}>
                  <p className='text-sm text-muted-foreground'>&quot;{testimonial.quote}&quot;</p>
                  <footer className='mt-2 text-sm font-medium'>
                    - {testimonial.author}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            {/* We will render stats here */}
            <div className='grid grid-cols-2 gap-4'>
              {stats.map((stat) => (
                <div key={stat.id} className='rounded-lg bg-muted p-4'>
                  <h4 className='text-2xl font-bold'>{stat.value}</h4>
                  <p className='text-sm text-muted-foreground'> {stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
