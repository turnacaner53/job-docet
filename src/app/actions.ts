'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import arcjet, { detectBot, shield } from '@/utils/arcjet';
import { prisma } from '@/utils/db';
import { inngest } from '@/utils/inngest/client';
import { jobListingDurationPricing } from '@/utils/jobListingDurationPricing';
import { requireUser } from '@/utils/requireUser';
import { companySchema, jobSchema, jobSeekerSchema } from '@/utils/schemas';
import { stripe } from '@/utils/stripe';
import { request } from '@arcjet/next';
import { z } from 'zod';

const aj = arcjet
  .withRule(
    shield({
      mode: 'LIVE',
    }),
  )
  .withRule(
    detectBot({
      mode: 'LIVE',
      allow: [],
    }),
  );

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: { id: session.id },
    data: {
      onboardingCompleted: true,
      userType: 'COMPANY',
      Company: {
        create: {
          ...validateData, // schema and prisma model are the same so it works
        },
      },
    },
  });

  return redirect('/');
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

  const validateData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      onboardingCompleted: true,
      userType: 'JOB_SEEKER',
      JobSeeker: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect('/');
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

  const validateData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: { userId: user.id },
    select: {
      id: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  if (!company?.id) redirect('/');

  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email as string,
      name: user.name as string,
    });

    stripeCustomerId = customer.id;

    // update user with stripeCustomerId
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeCustomerId: customer.id, // update user with stripeCustomerId
      },
    });
  }

  const jobPost = await prisma.jobPost.create({
    data: {
      jobDescription: validateData.jobDescription,
      jobTitle: validateData.jobTitle,
      employmentType: validateData.employmentType,
      location: validateData.location,
      salaryFrom: validateData.salaryFrom,
      salaryTo: validateData.salaryTo,
      listingDuration: validateData.listingDuration,
      benefits: validateData.benefits,
      companyId: company.id,
    },
    select: {
      id: true,
    },
  });

  const pricingTier = jobListingDurationPricing.find(
    (p) => p.days === validateData.listingDuration,
  );

  if (!pricingTier) throw new Error('Invalid listing duration selected');

  await inngest.send({
    name: 'job/created',
    data: {
      jobId: jobPost.id,
      expirationDays: validateData.listingDuration,
    },
  });

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job Posting - ${pricingTier.days} days`,
            description: pricingTier.description,
            images: [
              'https://a1dp9sfjf3.ufs.sh/f/y3gqx62iQ8GUewk7PpKlCPg7fMwIeOjGDaRudqkHrsoKv46m',
            ],
          },
          currency: 'USD',
          unit_amount: pricingTier.price * 100, // convert to cents for stripe
        },
        quantity: 1,
      },
    ],
    metadata: {
      jobId: jobPost.id,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
  });

  return redirect(session.url as string);
}

export async function saveJobPost(jobId: string) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) throw new Error('Forbidden');

  await prisma.savedJobPost.create({
    data: {
      jobPostId: jobId,
      userId: user.id as string,
    },
  });

  revalidatePath(`/job/${jobId}`);
}

export async function unSaveJobPost(savedJobPostId: string) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) throw new Error('Forbidden');

  const data = await prisma.savedJobPost.delete({
    where: { id: savedJobPostId, userId: user.id as string },
    select: { jobPostId: true },
  });

  revalidatePath(`/job/${data.jobPostId}`);
}

export async function editJobPost(data: z.infer<typeof jobSchema>, jobId: string) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) throw new Error('Forbidden');

  const validateData = jobSchema.parse(data);

  await prisma.jobPost.update({
    where: { id: jobId, Company: { userId: user.id } },
    data: {
      jobDescription: validateData.jobDescription,
      jobTitle: validateData.jobTitle,
      employmentType: validateData.employmentType,
      location: validateData.location,
      salaryFrom: validateData.salaryFrom,
      salaryTo: validateData.salaryTo,
      listingDuration: validateData.listingDuration,
      benefits: validateData.benefits,
    },
  });

  return redirect('/my-jobs');
}

export async function deleteJobPost(jobId: string) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) throw new Error('Forbidden');

  await prisma.jobPost.delete({
    where: { id: jobId, Company: { userId: user.id } },
  });

  await inngest.send({
    name: 'job/cancel.expiration',
    data: { jobId: jobId },
  });

  return redirect('/my-jobs');
}
