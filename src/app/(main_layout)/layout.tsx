import React from 'react';

import Navbar from '@/components/global/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pb-12'>
      <Navbar />
      {children}
    </div>
  );
}
