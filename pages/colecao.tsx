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
                href="#"
                className="bg-red-400 h-[256px] w-[256px] rounded-md hover:scale-105 relative"
              >
                <Image
                  src={`/images/generated/${generation.image_name}.png`}
                  alt={`Tatuagem gerada por inteligencia artifical com o prompt: ${generation.prompt}`}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-md"
                />
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
