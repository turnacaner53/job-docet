import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';

import { formatCurrency } from '@/utils/formatCurrency';

import { Slider } from '../ui/slider';

interface SalaryRangeSelectorProps {
  control: Control<any>;
  minSalary?: number;
  maxSalary?: number;
  step?: number;
  currency?: string;
}

export default function SalaryRangeSelector({
  control,
  minSalary,
  maxSalary,
  step,
}: SalaryRangeSelectorProps) {
  const { field: fromField } = useController({
    name: 'salaryFrom',
    control,
  });

  const { field: toField } = useController({
    name: 'salaryTo',
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    fromField.value || minSalary,
    toField.value || (maxSalary ? maxSalary / 2 : 0),
  ]);

  const handleChangeRange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    fromField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  };

  return (
    <div className='w-full space-y-4'>
      <Slider
        onValueChange={handleChangeRange}
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
      />
      <div className='flex justify-between px-2'>
        <span>{formatCurrency(range[0])}</span>
        <span>{formatCurrency(range[1])}</span>
      </div>
    </div>
  );
}
