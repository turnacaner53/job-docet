import { notFound } from 'next/navigation';

import { prisma } from '@/utils/db';
import { requireUser } from '@/utils/requireUser';
import EditJobForm from '@/components/forms/EditJobForm';

async function getJob(jobId: string, userId: string) {
  const data = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      Company: {
        userId: userId,
      },
    },
    select: {
      benefits: true,
      id: true,
      jobTitle: true,
      jobDescription: true,
      salaryFrom: true,
      salaryTo: true,
      location: true,
      employmentType: true,
      listingDuration: true,
      Company: {
        select: {
          name: true,
          location: true,
          logo: true,
          xAccount: true,
          website: true,
          about: true,
        },
      },
    },
  });

  if (!data) return notFound();

  return data;
}

type Params = Promise<{ jobId: string }>;

export default async function JobEditPage({ params }: { params: Params }) {
  const { jobId } = await params;
  const session = await requireUser();

  const jobData = await getJob(jobId, session.id as string);

  return (
    <EditJobForm jobPost={jobData} />
  )
}
