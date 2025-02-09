import Image from 'next/image';
import Link from 'next/link';

import { formatCurrency } from '@/utils/formatCurrency';
import { formatRelativeTime } from '@/utils/formatRelativeTme';
import { MapPin } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Card, CardHeader } from '../ui/card';

interface JobCardProps {
  job: {
    id: string;
    createdAt: Date;
    Company: {
      about: string;
      name: string;
      location: string;
      logo: string;
    };
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/job/${job.id}`}>
      <Card className='transition-all duration-200 hover:border-primary/50 hover:shadow-lg'>
        <CardHeader>
          <div className='flex flex-col gap-4 md:flex-row'>
            <Image
              src={job.Company.logo}
              alt={job.Company.name}
              width={48}
              height={48}
              className='size-12 rounded-lg'
            />
            <div className=''>
              <h1 className='text-xl font-bold md:text-2xl'>{job.jobTitle}</h1>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='text-sm text-muted-foreground'>{job.Company.name}</p>
                <span className='hidden text-muted-foreground md:inline'>*</span>
                <Badge className='rounded-full' variant='secondary'>
                  {job.employmentType}
                </Badge>
                <span className='hidden text-muted-foreground md:inline'>*</span>
                <Badge className='rounded-full'>{job.location}</Badge>
                <span className='hidden text-muted-foreground md:inline'>*</span>
                <p className='text-sm text-muted-foreground'>
                  {formatCurrency(job.salaryFrom)} - {formatCurrency(job.salaryTo)}
                </p>
              </div>
            </div>

            <div className='text-right md:ml-auto'>
              <div className='flex flex-row items-center justify-end gap-2'>
                <MapPin className='size-4' />
                <h1>{job.location}</h1>
              </div>
              <p className='text-sm text-muted-foreground md:text-right'>
                {formatRelativeTime(job.createdAt)}
              </p>
            </div>
          </div>

          <div>
            <p className='!mt-4 line-clamp-2 text-base text-muted-foreground'>
              {job.Company.about}
            </p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
