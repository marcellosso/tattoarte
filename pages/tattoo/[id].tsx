import Image from 'next/image';
import Link from 'next/link';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { prisma } from '@/utils/use-prisma';
import { Generation, User } from '@prisma/client';
import { FC, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import MainNavbar from '@/components/navbars/main-navbar';

interface ITattoo {
  generation: Generation;
}

const Tattoo: FC<ITattoo> = ({ generation }) => {
  const [openFullscreenImageModal, setOpenFullscreenImageModal] =
    useState(false);

  return (
    <>
      <MainNavbar />
      <main className="flex min-h-screen h-screen flex-col items-center p-12 pt-24 bg-primary text-letter">
        <div className="bg-secondary h-full w-full mt-4 rounded-md shadow-2xl p-6 relative pt-2">
          {openFullscreenImageModal && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center hover:cursor-pointer"
              onClick={() => setOpenFullscreenImageModal(false)}
            >
              <div className="w-[1024px] h-[768px] my-2 md:my-0 rounded-md flex items-center justify-center relative">
                <Image
                  src={generation.imageUrl}
                  alt="Arte de tatuagem criada pela inteligencia artificial - TattooArte!"
                  objectFit="contain"
                  layout="fill"
                  className="rounded-md"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col items-center w-full h-full">
            <span className="text-gray-200 text-xs">
              Criado em:{' '}
              {new Date(generation.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <span className="text-gray-400 text-md font-bold">
              TATUAGEM {generation.style.toUpperCase()}
            </span>
            <span className=" text-gray-400 text-sm">
              por{' '}
              <Link
                href={`/colecao?userId=${generation.authorId}`}
                className="text-detail font-bold hover:text-yellow-600"
              >
                {generation.authorName}
              </Link>
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
            <div className="w-[512px] h-[512px] relative hover:scale-105 hover:cursor-pointer">
              <Image
                src={generation.imageUrl}
                alt={`Tatuagem gerada por inteligencia artifical com o prompt: ${generation.prompt}`}
                objectFit="cover"
                layout="fill"
                priority
                className="rounded-md"
                onClick={() => setOpenFullscreenImageModal(true)}
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
