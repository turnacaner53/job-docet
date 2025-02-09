import { requireUser } from '@/utils/requireUser';
import { type FileRouter, createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '2MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await requireUser();

      if (!session.id) throw new UploadThingError('You must be logged in to upload images');

      return { userId: session.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

    resumeUploader: f({
      "application/pdf": {
        maxFileSize: '2MB',
        maxFileCount: 1,
      },
    })
      .middleware(async () => {
        const session = await requireUser();
  
        if (!session.id) throw new UploadThingError('You must be logged in to upload images');
  
        return { userId: session.id };
      })
      .onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log('Upload complete for userId:', metadata.userId);
  
        console.log('file url', file.url);
  
        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: metadata.userId };
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
