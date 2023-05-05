import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/utils/use-prisma';
import type { Generation } from '@prisma/client';
import { FC, useState } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import MainNavbar from '@/components/navbars/main-navbar';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface ITattoo {
  generation: Generation;
}

const Tattoo: FC<ITattoo> = ({ generation }) => {
  const [openFullscreenImageModal, setOpenFullscreenImageModal] =
    useState(false);

  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="flex flex-col items-center h-screen w-screen justify-center">
        <Image
          src={`/images/tattooarte-logo.png`}
          alt="Logo TattooArtIA. Robo representando IA e uma maquina de tatuagem."
          width={100}
          height={100}
          priority
          quality={100}
          className=" ml-1 animate-bounce"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <span className="text-letter text-sm font-extrabold">
          Carregando...
        </span>
      </div>
    );
  }

  return (
    <main>
      <Head>
        <title>
          {`${generation.prompt} - Tatuagem gerada por IA - Crie a sua tattoo |
          TattooArtIA`}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={`${generation.prompt} - Tatuagem criada por nossa inteligência artificial pelo usuário ${generation.authorName}. 
          Venha usufruir de nossa IA poderosa e ache uma ideia perfeita e única para sua proxima tatuagem!`}
        />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content={`${generation.prompt} - Tatuagem gerada por IA -
          Crie a sua tattoo | TattooArtIA`}
        />
        <meta
          name="twitter:description"
          content={`${generation.prompt} - Tatuagem criada por nossa inteligência artificial pelo usuário ${generation.authorName}. 
          Venha usufruir de nossa IA poderosa e ache uma ideia perfeita e única para sua proxima tatuagem!`}
        />
        <meta name="twitter:creator" content="@tattooartia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://www.tattooartia.com/tattoo/${generation.id}`}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={`${generation.prompt} - Tatuagem gerada por IA -
          Crie a sua tattoo | TattooArtIA`}
        />
        <meta
          property="og:description"
          content={`${generation.prompt} - Tatuagem criada por nossa inteligência artificial pelo usuário ${generation.authorName}. 
          Venha usufruir de nossa IA poderosa e ache uma ideia perfeita e única para sua proxima tatuagem!`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.tattooartia.com/tattoo/${generation.id}`}
        />

        {/* Dynamic */}
        {/* Twitter */}
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}api/og?generationUrl=${generation.imageUrl}&generationAuthor=${generation.authorName}&generationPrompt=${generation.prompt}`}
        />
        <meta
          name="twitter:image:alt"
          content={`${generation.prompt} - Tatuagem criada por nossa inteligência artificial pelo usuário ${generation.authorName}!`}
        />

        {/* Open Graph */}
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}api/og?generationUrl=${generation.imageUrl}&generationAuthor=${generation.authorName}&generationPrompt=${generation.prompt}`}
        />
        <meta
          property="og:image:alt"
          content={`${generation.prompt} - Tatuagem criada por nossa inteligência artificial pelo usuário ${generation.authorName}!`}
        />
      </Head>
      <MainNavbar />
      <section className="flex min-h-screen h-screen flex-col items-center p-6 pt-12 md:p-12 md:pt-24 bg-primary text-letter">
        <div className="bg-secondary h-full w-full mt-4 rounded-md shadow-2xl p-3 md:p-6 relative pt-2">
          {openFullscreenImageModal && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center hover:cursor-pointer"
              onClick={() => setOpenFullscreenImageModal(false)}
            >
              <div className="w-[1024px] h-5/6 my-2 md:my-0 rounded-md flex items-center justify-center relative">
                <Image
                  src={generation.imageUrl}
                  alt={`Arte de tatuagem criada pela inteligência artificial com prompt: ${generation.prompt} - TattooArte!`}
                  className="rounded-md"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          )}
          <div className="flex flex-col items-center w-full h-full">
            <span className="text-gray-200 text-2xs sm:text-xs">
              Criado em:{' '}
              {new Date(generation.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <h1 className="text-gray-400 text-sm sm:text-md font-bold">
              TATUAGEM {generation.style.toUpperCase()}
            </h1>
            <span className=" text-gray-400 text-xs sm:text-sm">
              por{' '}
              {generation.authorId ? (
                <Link
                  href={`/colecao?userId=${generation.authorId}`}
                  className="text-detail text-sm sm:text-md font-bold hover:text-yellow-600"
                >
                  {generation.authorName}
                </Link>
              ) : (
                <span className="text-detail font-bold">
                  {generation.authorName}
                </span>
              )}
            </span>
            <h2 className="text-detail font-bold text-lg sm:text-xl md:text-2xl text-center">
              {generation.prompt}
            </h2>
            <p className="text-letter text-sm md:text-md mb-4 md:mb-6 text-center">
              Tatuagem criada com ajuda de nossa Inteligência Artificial (IA).
            </p>
            <Link
              href="/criar"
              className="mb-3 md:mb-6 flex items-center justify-center bg-detail hover:scale-105 text-xs xs:text-sm sm:text-md md:text-lg sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 font-bold text-primary p-3 rounded-md"
            >
              Crie sua própria tatuagem
            </Link>
            <div className="h-1/2 w-full sm:h-[512px] sm:w-[512px] hover:scale-105 hover:cursor-pointer relative">
              <Image
                src={generation.imageUrl}
                alt={`Tatuagem gerada por inteligência artifical com o prompt: ${generation.prompt}`}
                priority
                className="rounded-md"
                onClick={() => setOpenFullscreenImageModal(true)}
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const generations = await prisma.generation.findMany();

  const paths = generations.map((gen) => ({
    params: { id: gen.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const generationId = params?.id;

  const generation =
    (await prisma.generation.findFirst({
      where: {
        id: generationId as string,
      },
    })) || {};

  return {
    props: {
      generation: JSON.parse(JSON.stringify(generation || {})),
    },
  };
};

export default Tattoo;
