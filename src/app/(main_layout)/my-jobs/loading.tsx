import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function LoadingMyJobsPage() {
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
            {[...Array(10)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className='size-10 rounded-lg' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[140px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[180px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[100px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='ml-auto] size-6 rounded-md' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
