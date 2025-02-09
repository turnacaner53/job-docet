import React from 'react';

import { redirect } from 'next/navigation';

import OnboardingForm from '@/components/forms/onboarding/OnboardingForm';
import { prisma } from '@/utils/db';
import { requireUser } from '@/utils/requireUser';

async function checkIfUserHasFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { onboardingCompleted: true },
  });

  if (user?.onboardingCompleted === true) {
    redirect('/');
  }
}

export default async function OnboardingPage() {
  const sesion = await requireUser();
  
  await checkIfUserHasFinishedOnboarding(sesion.id as string);

  return (
    <div className='flex min-h-screen w-screen flex-col items-center justify-center py-10'>
      <OnboardingForm />
    </div>
  );
}
