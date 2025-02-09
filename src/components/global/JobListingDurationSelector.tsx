import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { jobListingDurationPricing } from '@/utils/jobListingDurationPricing';

import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface JobListingDurationSelectorProps {
  field: ControllerRenderProps<any>;
}

export default function JobListingDurationSelector({ field }: JobListingDurationSelectorProps) {
  return (
    <RadioGroup
      value={field.value?.toString()}
      onValueChange={(value) => field.onChange(parseInt(value))}
    >
      <div className='flex flex-col gap-4'>
        {jobListingDurationPricing.map((duration) => (
          <div key={duration.days}>
            <RadioGroupItem
              value={duration.days.toString()}
              id={duration.days.toString()}
              className='sr-only'
            />
            <Label htmlFor={duration.days.toString()} className='flex cursor-pointer flex-col'>
              <Card
                className={cn(
                  field.value === duration.days
                    ? 'border-primary bg-primary/10'
                    : 'hover:bg-secondary/50',
                  'border-2 p-4 transition-all',
                )}
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-lg font-semibold'>{duration.days} Days</p>
                    <p className='text-sm text-muted-foreground'>{duration.description}</p>
                  </div>

                  <div className='text-right'>
                    <p className='text-xl font-bold'>${duration.price}</p>
                    <p className='text-sm text-muted-foreground'>
                      {(duration.price / duration.days).toFixed(2)} / days
                    </p>
                  </div>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
