
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/../public/logo.png';
import { auth } from '@/utils/auth';

import { buttonVariants } from '../ui/button';
import { ModeToggle } from './ModeToggle';
import UserDropdown from './UserDropdown';

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className='flex items-center justify-between py-5'>
      <Link href='/' className='flex items-center space-x-2'>
        <Image src={Logo} alt='Logo Job Docet' width={40} height={40} />
        <h1 className='text-2xl font-bold'>
          Job<span className='text-primary'>Docet</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className='hidden items-center gap-5 md:flex'>
        <ModeToggle />
        <Link className={buttonVariants({ size: 'lg' })} href='/post-job'>
          Post Job
        </Link>
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Link href='/login' className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
