import Image from 'next/image';
import Link from 'next/link';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@/utils/use-prisma';
import { Generation, User } from '@prisma/client';
import { FC } from 'react';
import { GetServerSidePropsContext } from 'next';
import MainNavbar from '@/components/navbars/main-navbar';

interface ITattoo {
  generation: Generation;
}

const Tattoo: FC<ITattoo> = ({ generation }) => {
  return (
    <>
      <MainNavbar />
      <main className="flex min-h-screen h-screen flex-col items-center p-12 pt-24 bg-primary text-letter">
        <div className="bg-secondary h-full w-full mt-4 rounded-md shadow-2xl p-6 ">
          <div className="flex flex-col items-center  w-full h-full">
            <span className="text-gray-400 text-md font-bold">
              TATUAGEM {generation.style.toUpperCase()}
            </span>
            <h2 className="text-detail font-bold text-2xl">
              {generation.prompt}
            </h2>
            <p className="text-letter font-md mb-6">
              Tatuagem criada com ajuda de nossa Inteligencia Artificial (IA).
            </p>
            <Link
              href="/criar"
              className="mb-6 flex items-center justify-center bg-detail hover:scale-105 text-lg bg-gradient-to-r w-1/5 font-bold text-primary p-3 rounded-md"
            >
              Crie sua própria tatuagem
            </Link>
            <div className="w-[512px] h-[512px] relative">
              <Image
                src={`/images/generated/${generation.image_name}.png`}
                alt={`Tatuagem gerada por inteligencia artifical com o prompt: ${generation.prompt}`}
                objectFit="cover"
                layout="fill"
                priority
                className="rounded-md"
              />
            </div>
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
  const generationId = query?.id;

  const generation =
    (await prisma.generation.findFirst({
      where: {
        id: generationId as string,
      },
    })) || {};

  return {
    props: {
      generation: JSON.parse(JSON.stringify(generation)),
    },
  };
};

export default Tattoo;
