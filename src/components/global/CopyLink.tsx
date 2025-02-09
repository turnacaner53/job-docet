'use client';

import React from 'react';

import { Link2 } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { toast } from 'sonner';

export default function CopyLinkMenuItem({ jobUrl }: { jobUrl: string }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success('Job URL copied to clipboard');
    } catch (error) {
      console.error('Failed to copy!', error);
        toast.error('Failed to copy job URL');
    }
  }

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className=" h-4 w-4" />
      <span>Copy Job URL</span>
    </DropdownMenuItem>
  );
}
