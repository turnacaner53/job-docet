import React from 'react';

import { cn } from '@/lib/utils';
import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  ListIcon,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from 'lucide-react';

import { Button } from '../ui/button';
import { Toggle } from '../ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null;

  return (
    <div className='flex flex-wrap items-center gap-1 rounded-lg border bg-card p-2'>
      <TooltipProvider>
        <div className='flex flex-wrap items-center gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                className={cn(editor.isActive('bold') && 'bg-primary/50 text-muted-foreground')}
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('italic')}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                className={cn(editor.isActive('italic') && 'bg-primary/50 text-muted-foreground')}
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('strike')}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                className={cn(editor.isActive('strike') && 'bg-primary/50 text-muted-foreground')}
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Strike</TooltipContent>
          </Tooltip>

          <div className='flex gap-1 rounded-md border p-0.5'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size='sm'
                  pressed={editor.isActive('heading', { level: 1 })}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={cn(
                    editor.isActive('heading', { level: 1 }) && 'bg-primary/50 text-muted-foreground',
                  )}
                >
                  <Heading1 />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Heading 1</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size='sm'
                  pressed={editor.isActive('heading', { level: 2 })}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={cn(
                    editor.isActive('heading', { level: 2 }) && 'bg-primary/50 text-muted-foreground',
                  )}
                >
                  <Heading2 />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Heading 2</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size='sm'
                  pressed={editor.isActive('heading', { level: 3 })}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={cn(
                    editor.isActive('heading', { level: 3 }) && 'bg-primary/50 text-muted-foreground',
                  )}
                >
                  <Heading3 />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Heading 3</TooltipContent>
            </Tooltip>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('bulletList')}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(editor.isActive('bulletList') && 'bg-primary/50 text-muted-foreground')}
              >
                <ListIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('orderedList')}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(editor.isActive('orderedList') && 'bg-primary/50 text-muted-foreground')}
              >
                <ListOrdered />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
        </div>

        <div className='mx-2 h-6 w-px bg-border' />

        <div className='flex flex-wrap gap-1'>
          <div className='flex gap-1 rounded-md border p-0.5'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size='sm'
                  pressed={editor.isActive({ textAlign: 'left' })}
                  onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
                  className={cn(
                    editor.isActive({ TextAlign: 'left' }) && 'bg-primary/50 text-muted-foreground',
                  )}
                >
                  <AlignLeft />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size='sm'
                  pressed={editor.isActive({ textAlign: 'center' })}
                  onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
                  className={cn(
                    editor.isActive({ TextAlign: 'center' }) && 'bg-primary/50 text-muted-foreground',
                  )}
                >
                  <AlignCenter />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size='sm'
                  pressed={editor.isActive({ textAlign: 'right' })}
                  onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
                  className={cn(
                    editor.isActive({ TextAlign: 'right' }) && 'bg-primary/50 text-muted-foreground',
                  )}
                >
                  <AlignRight />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className='mx-2 h-6 w-px bg-border' />

        <div className='flex flex-wrap gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='sm'
                variant='ghost'
                type='button'
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='sm'
                variant='ghost'
                type='button'
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
