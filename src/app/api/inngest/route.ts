import { inngest } from '@/utils/inngest/client';
import {
  handleJobExpiration,
  helloWorld,
  sendPeriodicJobListings,
} from '@/utils/inngest/functions';
import { serve } from 'inngest/next';

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, handleJobExpiration, sendPeriodicJobListings],
});
