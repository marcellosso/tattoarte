import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/utils/use-prisma';
import { Generation } from '@prisma/client';
import { FC } from 'react';
import MainNavbar from '@/components/navbars/main-navbar';
import { GetServerSidePropsContext } from 'next';

interface IDiscover {
  generations: Generation[];
}

const Discover: FC<IDiscover> = ({ generations }) => {
  return (
    <>
      <MainNavbar />
      <main className="flex min-h-screen h-screen flex-col items-center pt-24 pb-0 bg-secondary text-letter">
        <h1 className="text-3xl font-bold">
          Descubra criações de outros{' '}
          <span className="text-detail">usuários</span>!
        </h1>
        <p className="text-letter font-md mb-3">
          Veja o que outros estão criando usando nossa Inteligencia Artificial
          (IA) artista de tatuagens!
        </p>
        <Link
          href="/criar"
          className="mb-3 flex items-center justify-center bg-detail hover:scale-105 text-lg bg-gradient-to-r w-1/5 font-bold text-primary p-3 rounded-md"
        >
          Crie sua própria arte
        </Link>

        <div className="bg-primary h-full w-full mt-4 rounded-md p-6 overflow-y-scroll overflow-x-hidden scrollbar-hide">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:md:grid-cols-6 w-full h-full grid-rows-none gap-5">
            {generations.map((generation) => (
              <Link
                key={generation.id}
                href={`/tattoo/${generation.id}`}
                className="h-[256px] w-[256px] rounded-md hover:scale-105 relative group"
              >
                <Image
                  src={generation.imageUrl}
                  alt={`Tatuagem gerada por inteligencia artifical com o prompt: ${generation.prompt}`}
                  objectFit="cover"
                  layout="fill"
                  priority
                  className="rounded-md"
                  loader={() => generation.imageUrl}
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const style = query.estilo || undefined;

  const generations =
    (await prisma.generation.findMany({
      where: {
        is_private: false,
        style: style as string,
      },
      take: 24,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })) || [];

  return {
    props: {
      generations: JSON.parse(JSON.stringify(generations)),
    },
  };
};

export default Discover;
