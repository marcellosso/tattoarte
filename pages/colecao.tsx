import Image from 'next/image';
import Link from 'next/link';
import AppNavbar from '@/components/navbars/app-navbar';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@/utils/use-prisma';
import { Generation, User } from '@prisma/client';
import { FC } from 'react';

interface ICollection {
  user: User;
  generations: Generation[];
  ownerName: string;
}

const Collection: FC<ICollection> = ({ user, generations, ownerName }) => {
  return (
    <>
      <AppNavbar user={user} />
      <main className="flex min-h-screen h-screen flex-col items-center p-12 pt-24 bg-primary text-letter">
        <h1 className="text-3xl font-bold">
          Coleção de <span className="text-detail">{ownerName}</span>
        </h1>

        <div className="bg-secondary h-full w-full mt-4 rounded-md shadow-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:md:grid-cols-6 w-full h-full grid-rows-none gap-5">
            {generations.map((generation) => (
              <Link
                key={generation.id}
                href={`/tattoo/${generation.id}`}
                className="h-[256px] w-[256px] rounded-md hover:scale-105 relative group"
              >
                <Image
                  src={`/images/generated/${generation.image_name}.png`}
                  alt={`Tatuagem gerada por inteligencia artifical com o prompt: ${generation.prompt}`}
                  objectFit="cover"
                  layout="fill"
                  priority
                  className="rounded-md"
                />
                <div className="bg-primary opacity-0 h-10 w-26 p-2 flex items-center justify-center rounded-xl absolute top-1 left-1 group-hover:opacity-100 transition-all overflow-ellipsis">
                  <span className="text-detail">{generation.style}</span>
                </div>
                <div className="bg-primary opacity-0 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0 group-hover:opacity-100 transition-all">
                  <span className="text-xs overflow-ellipsis overflow-hidden">
                    {generation.prompt}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { req, res, query } = context;
    const session = await getSession(req, res);
    const sessionUser = session!.user || {};

    const user = (await prisma.user.findUnique({
      where: {
        email: sessionUser.email as string,
      },
    })) as User;

    const queryId = query?.userId || user?.id;

    let generationsFromUser = [] as Generation[];

    const isSameUser = queryId == user?.id;
    let ownerName = user?.name;

    if (!isSameUser) {
      const owner = (await prisma.user.findUnique({
        where: {
          id: queryId as string,
        },
        select: {
          name: true,
        },
      })) as User;

      ownerName = owner?.name;
    }

    generationsFromUser =
      (await prisma.generation.findMany({
        where: {
          authorId: queryId as string,
          is_private: !isSameUser ? false : undefined,
        },
      })) || [];

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        generations: JSON.parse(JSON.stringify(generationsFromUser)),
        ownerName,
      },
    };
  },
});

export default Collection;
