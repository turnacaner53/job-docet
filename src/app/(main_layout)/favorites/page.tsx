import EmptyState from '@/components/global/EmptyState';
import JobCard from '@/components/global/JobCard';
import { prisma } from '@/utils/db';
import { requireUser } from '@/utils/requireUser';

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: { userId: userId },
    select: {
      JobPost: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          location: true,
          employmentType: true,
          createdAt: true,
          Company: {
            select: {
              name: true,
              logo: true,
              location: true,
              about: true,
            },
          },
        },
      },
    },
  });

  return data;
}

export default async function FavoritesPage() {
  const session = await requireUser();

  const data = await getFavorites(session?.id as string);

  if (data.length === 0) {
    return (
      <EmptyState
        title='No Favorites Found'
        description='You have not favories yet'
        buttonText='Find a Job'
        href='/'
      />
    );
  }
  return (
    <div className='mt-5 grid grid-cols-1 gap-4'>
      {data.map((favorite) => (
        <JobCard key={favorite.JobPost.id} job={favorite.JobPost} />
      ))}
    </div>
  );
}
