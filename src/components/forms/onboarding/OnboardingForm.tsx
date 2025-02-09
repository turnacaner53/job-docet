'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import Logo from '@/../public/logo.png';

import { Card, CardContent } from '@/components/ui/card';

import CompanyForm from './CompanyForm';
import UserTypeSelection from './UserTypeForm';
import JobSeekerForm from './JobSeekerForm';

type UserSelectionType = 'company' | 'jobSeeker' | null;

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  const handleUserTypeSelection = (type: UserSelectionType) => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelection} />;

      case 2:
        return userType === 'company' ? <CompanyForm /> :  <JobSeekerForm />;

      default:
        return null;
    }
  };

  return (
    <>
      <div className='mb-10 flex items-center gap-4'>
        <Image src={Logo} alt='Logo' width={50} height={50} />
        <h1 className='text-4xl font-bold'>
          Job<span className='text-primary'>Docet</span>
        </h1>
      </div>

      <Card className='w-full max-w-lg'>
        <CardContent className='p-6'>{renderStep()}</CardContent>
      </Card>
    </>
  );
}
