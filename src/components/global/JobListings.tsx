import { prisma } from '@/utils/db';
import { JobPostStatus } from '@prisma/client';

import EmptyState from './EmptyState';
import JobCard from './JobCard';
import MainPagination from './MainPagination';

async function getData({
  page = 1,
  pageSize = 4,
  jobTypes = [],
  location = '',
}: {
  page: number;
  pageSize: number;
  jobTypes: string[];
  location: string;
}) {
  const skip = (page - 1) * pageSize;
  const where = {
    status: JobPostStatus.ACTIVE,
    ...(jobTypes.length > 0 && {
      employmentType: { in: jobTypes },
    }),
    ...(location &&
      location !== 'worldwide' && {
        location: location,
      }),
  };

  // await new Promise(resolve => setTimeout(resolve, 2000));
  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      select: {
        id: true,
        jobTitle: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),

    prisma.jobPost.count({
      where: { status: 'ACTIVE' },
    }),
  ]);

  return { jobs: data, totalPages: Math.ceil(totalCount / pageSize) };
}

export default async function JobListings({
  currentPage,
  jobTypes,
  location
}: {
  currentPage: number;
  jobTypes: string[];
  location: string;
}) {
  const { jobs, totalPages } = await getData({
    page: currentPage,
    pageSize: 4,
    jobTypes: jobTypes,
    location: location,
  });

  return (
    <>
      {jobs.length > 0 ? (
        <div className='flex flex-col gap-6'>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title='No Jobs Found'
          description='There are no jobs available at the moment. Please check back later.'
          buttonText='Clear all filters'
          href='/'
        />
      )}

      <div className='mt-6 flex justify-center'>
        <MainPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
