'use client';

import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { countryList } from '@/utils/countriesList';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

export function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];

  // Get current filters from URL
  const currentJobTypes = searchParams.get('jobTypes')?.split(',') || [];
  const currentLocation = searchParams.get('location') || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams],
  );

  const handleJobTypeChange = (type: string, checked: boolean) => {
    const current = new Set(currentJobTypes);
    if (checked) {
      current.add(type);
    } else {
      current.delete(type);
    }

    const newValue = Array.from(current).join(',');
    router.push(`?${createQueryString('jobTypes', newValue)}`);
  };

  const handleLocationChange = (location: string) => {
    router.push(`?${createQueryString('location', location)}`);
  };

  const clearFilters = () => {
    router.push('/');
  };

  return (
    <Card className='col-span-1 h-fit'>
      <CardHeader className='space-y-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-2xl font-semibold'>Filter</CardTitle>
          <Button variant='destructive' size='sm' className='h-8' onClick={clearFilters}>
            <span className='mr-2'>Clear all</span>
            <X className='h-4 w-4' />
          </Button>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <Label className='text-lg font-semibold'>Job Type</Label>
          <div className='grid grid-cols-2 gap-4'>
            {jobTypes.map((type) => (
              <div key={type} className='flex items-center space-x-2'>
                <Checkbox
                  id={type.toLowerCase()}
                  checked={currentJobTypes.includes(type)}
                  onCheckedChange={(checked) => handleJobTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={type.toLowerCase()} className='text-sm font-medium'>
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className='space-y-4'>
          <Label className='text-lg font-semibold'>Location</Label>
          <Select value={currentLocation} onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder='Select Location' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Worldwide</SelectLabel>
                <SelectItem value='worldwide'>
                  <span>🌍</span>
                  <span className='pl-2'>Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((country) => (
                  <SelectItem value={country.name} key={country.name}>
                    <span>{country.flagEmoji}</span>
                    <span className='pl-2'>{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
