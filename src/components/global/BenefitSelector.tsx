import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { benefits } from '@/utils/benefitsList';

import { Badge } from '../ui/badge';

interface BenefitSelectorProps {
  field: ControllerRenderProps<any>;
}

export default function BenefitSelector({ field }: BenefitSelectorProps) {
  const toggleBenefit = (benefitId: string) => {
    const currentBenefits = field.value || [];

    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => id !== benefitId)
      : [...currentBenefits, benefitId];

    field.onChange(newBenefits);
  };

  return (
    <div>
      <div className='flex flex-wrap gap-3'>
        {benefits.map((benefit) => {
          const isSelected = (field.value || []).includes(benefit.id);
          return (
            <Badge
              className='cursor-pointer rounded-full px-4 py-1.5 text-sm transition-all hover:scale-105 active:scale-95'
              key={benefit.id}
              variant={isSelected ? 'default' : 'outline'}
              onClick={() => toggleBenefit(benefit.id)}
            >
              <span className='flex items-center gap-2'>
                {benefit.icon}
                {benefit.label}
              </span>
            </Badge>
          );
        })}

        <div className="mt-4 text-sm text-muted-foreground">
            Selected Benefits: <span className='text-primary'>{(field.value|| []).length}</span>
        </div>
      </div>
    </div>
  );
}
