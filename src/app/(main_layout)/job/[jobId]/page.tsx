import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { saveJobPost, unSaveJobPost } from '@/app/actions';
import JsonToHtml from '@/components/global/JsonToHtml';
import { SaveJobButton } from '@/components/global/SubmitButtons';
import { cn } from '@/lib/utils';
import arcjet, { detectBot, fixedWindow, request, tokenBucket } from '@/utils/arcjet';
import { auth } from '@/utils/auth';
import { benefits } from '@/utils/benefitsList';
import { getFlagEmoji } from '@/utils/countriesList';
import { prisma } from '@/utils/db';
import '@arcjet/next';
import { Heart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const aj = arcjet
  .withRule(
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
    }),
  )
  .withRule(fixedWindow({ mode: 'LIVE', max: 10, window: '60s' }));

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: 'LIVE',
        capacity: 100,
        interval: 60,
        refillRate: 30,
      }),
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: 'LIVE',
        capacity: 100,
        interval: 60,
        refillRate: 10,
      }),
    );
  }
}

async function getJob(jobId: string, userId?: string) {
  const [jobData, savedJob] = await Promise.all([
    await prisma.jobPost.findUnique({
      where: { status: 'ACTIVE', id: jobId },
      select: {
        jobTitle: true,
        jobDescription: true,
        location: true,
        employmentType: true,
        benefits: true,
        createdAt: true,
        listingDuration: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),

    userId
      ? prisma.savedJobPost.findUnique({
          where: {
            userId_jobPostId: {
              userId: userId,
              jobPostId: jobId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }

  return { jobData, savedJob };
}

type Params = Promise<{ jobId: string }>;

export default async function JobDetailPage({ params }: { params: Params }) {
  const { jobId } = await params;

  const session = await auth();

  const req = await request();
  // const decision = await aj.protect(req);
  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) throw new Error('Forbidden');

  const { jobData: job, savedJob } = await getJob(jobId, session?.user?.id);

  const locationFlag = getFlagEmoji(job.location);

  return (
    <div className='grid gap-8 lg:grid-cols-3'>
      <div className='col-span-2 space-y-8'>
        {/* header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>{job.jobTitle}</h1>
            <div className='mt-2 flex items-center gap-2'>
              <p className='font-medium'>{job.Company.name}</p>
              <span className='hidden text-muted-foreground md:inline'>*</span>
              <Badge className='rounded-full' variant='secondary'>
                {job.employmentType}
              </Badge>
              <span className='hidden text-muted-foreground md:inline'>*</span>
              <Badge className='flex items-center gap-2 rounded-full'>
                {locationFlag && <span>{locationFlag}</span>} {job.location}
              </Badge>
            </div>
          </div>

          {session?.user ? (
            <form
              action={
                savedJob ? unSaveJobPost.bind(null, savedJob.id) : saveJobPost.bind(null, jobId)
              }
            >
              <SaveJobButton savedJob={!!savedJob} />
            </form>
          ) : (
            <Link href='/login' className={buttonVariants({ variant: 'outline' })}>
              Save Job
              <Heart className='size-4' />
            </Link>
          )}
        </div>

        {/* job description */}
        <section className='min-h-40 rounded-lg border border-dashed border-primary/50 p-6'>
          <JsonToHtml json={JSON.parse(job.jobDescription)} />
        </section>

        {/* benefits */}
        <section>
          <h3 className='mb-4 text-lg font-semibold'>
            Benefits{' '}
            <span className='text-sm font-normal text-muted-foreground'>
              (blue ones is offered)
            </span>
          </h3>

          <div className='flex flex-wrap gap-3'>
            {benefits.map((benefit) => {
              const isOffered = job.benefits.includes(benefit.id);
              return (
                <Badge
                  className={cn(
                    isOffered ? '' : 'cursor-not-allowed bg-muted/30 opacity-75',
                    'px4 rounded-full py-1.5 text-sm',
                  )}
                  key={benefit.id}
                  variant={isOffered ? 'default' : 'outline'}
                >
                  <span className='flex items-center gap-2'>
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>

      {/* company details */}
      <div className='space-y-6'>
        <Card className='p-6'>
          <div className='space-y-4'>
            <div>
              <h3 className='font-semibold'>Apply Now</h3>
              <p className='textsm mt-1 text-muted-foreground'>
                Please let {job.Company.name} know you found this job on JobDocet.
              </p>
            </div>

            <Button className='w-full'>Apply Now</Button>
          </div>
        </Card>

        {/* job details */}
        <Card className='p-6'>
          <h3 className='font-semibold capitalize'>About the job</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Apply before</span>
              <span className='text-sm'>
                {new Date(
                  job.createdAt.getTime() + job.listingDuration * 24 * 60 * 60 * 1000,
                ).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Posted on</span>
              <span className='text-sm'>
                {job.createdAt.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Employment Type</span>
              <span className='text-sm'>{job.employmentType}</span>
            </div>

            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Location</span>
              <span className='text-sm'>
                {locationFlag && <span className='mr-1'>{locationFlag}</span>}
                {job.location}
              </span>
            </div>
          </div>
        </Card>

        {/* company card */}
        <Card className='p-6'>
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <Image
                src={job.Company.logo}
                alt={job.Company.name}
                width={48}
                height={48}
                className='size-12 rounded-full'
              />

              <div className='flex flex-col'>
                <h3 className='font-semibold'>{job.Company.name}</h3>
                <p className='line-clamp-3 text-sm text-muted-foreground'>{job.Company.about}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
