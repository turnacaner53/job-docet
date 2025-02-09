import React from 'react';

import Link from 'next/link';

import { signOut } from '@/utils/auth';
import { ChevronDown, Heart, Layers2, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface UserDropdownProps {
  email: string
  name: string
  image: string
}

export default function UserDropdown(
  { email, name, image }: UserDropdownProps
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='h-auto p-0 hover:bg-transparent'>
          <Avatar>
            <AvatarImage src={image} alt='Profile Image' />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} strokeWidth={2} className='ml-2 opacity-60' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-48' align='end'>
        <DropdownMenuLabel className='flex flex-col gap-1'>
          <span className='text-sm font-medium text-foreground'>{name}</span>
          <span className='text-xs text-muted-foreground'>{email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/favorites'>
              <Heart size={16} strokeWidth={2} className='opacity-60' />
              <span className='ml-1'>Favorite Jobs</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/my-jobs'>
              <Layers2 size={16} strokeWidth={2} className='opacity-60' />
              <span className='ml-1'>My Job Listings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <button className='flex w-full items-center gap-2'>
              <LogOut size={16} strokeWidth={2} className='opacity-60' />
              <span className='ml-1'>Logout</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
