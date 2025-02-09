import { Suspense } from 'react';

import JobListingsLoading from '@/components/Skeletons/JobListingsLoading';
import { JobFilters } from '@/components/global/JobFilters';
import JobListings from '@/components/global/JobListings';

type SearchParams = {
  searchParams: Promise<{ page?: string; jobTypes?: string; location?: string }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const jobTypes = params.jobTypes?.split(',') || [];
  const location = params.location || '';

  const filterKey = `page=${currentPage};types=${jobTypes};location=${location}`;

  return (
    <div className='grid grid-cols-3 gap-8'>
      <JobFilters />
      <div className='col-span-2 flex flex-col gap-6'>
        <Suspense fallback={<JobListingsLoading />} key={filterKey}>
          <JobListings currentPage={currentPage} jobTypes={jobTypes} location={location} />
        </Suspense>
      </div>
    </div>
  );
}
