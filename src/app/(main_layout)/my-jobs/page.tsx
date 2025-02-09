import Image from 'next/image';
import Link from 'next/link';

import CopyLinkMenuItem from '@/components/global/CopyLink';
import EmptyState from '@/components/global/EmptyState';
import { prisma } from '@/utils/db';
import { requireUser } from '@/utils/requireUser';
import { MoreHorizontal, PenBox, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

async function getJobs(userId: string) {
  const data = await prisma.jobPost.findMany({
    where: { Company: { userId: userId } },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      Company: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export default async function MyJobsPage() {
  const session = await requireUser();
  const data = await getJobs(session?.id as string);

  if (data.length === 0) {
    return (
      <EmptyState
        title='No Jobs Found'
        description='You have not posted any jobs yet'
        buttonText='Post a Job'
        href='/post-job'
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Jobs</CardTitle>
        <CardDescription>Manage your job postings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <Image
                    src={listing.Company.logo}
                    alt={listing.Company.name}
                    width={40}
                    height={40}
                    className='size-10 rounded-lg'
                  />
                </TableCell>
                <TableCell>{listing.Company.name}</TableCell>
                <TableCell>{listing.jobTitle}</TableCell>
                <TableCell>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1).toLowerCase()}
                </TableCell>
                <TableCell>
                  {listing.createdAt.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size='icon' variant='ghost'>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/my-jobs/${listing.id}/edit`}>
                          <PenBox />
                          Edit Job
                        </Link>
                      </DropdownMenuItem>

                      <CopyLinkMenuItem
                        jobUrl={`${process.env.NEXT_PUBLIC_URL!}/job/${listing.id}`}
                      />

                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <Link href={`/my-jobs/${listing.id}/delete`}>
                          <XCircle />
                          Delete Job
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
