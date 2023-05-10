import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/utils/use-prisma';
import type { Generation } from '@prisma/client';
import { FC, useMemo, useState } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface ITattoo {
  generation: Generation;
}

const Tattoo: FC<ITattoo> = ({ generation }) => {
  const [openFullscreenImageModal, setOpenFullscreenImageModal] =
    useState(false);

  const router = useRouter();

  const userInitials = useMemo(() => {
    const name = generation?.authorName || '';
    const initials = name
      .match(/(^\S\S?|\b\S)?/g)
      ?.join('')
      ?.match(/(^\S|\S$)?/g)
      ?.join('')
      .toUpperCase();

    return initials;
  }, [generation?.authorName]);

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

  const renderUserTag = () => (
    <div className="flex items-end gap-2 mb-2 group">
      <div
        id="userAvatar"
        className="inline-flex items-center justify-center w-8 h-8 xs:w-12 xs:h-12 overflow-hidden rounded-md bg-letter group-hover:bg-detail group-hover:cursor-pointer transition-all duration-300"
      >
        <span className="text-primary font-bold text-xs xs:text-lg">
          {userInitials}
        </span>
      </div>
      <h4 className="text-letter text-xl sm:text-3xl font-extrabold group-hover:cursor-pointer group-hover:text-detail transition-all duration-300">
        {generation?.authorName}
      </h4>
    </div>
  );

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
      <section className="flex min-h-screen h-screen flex-col items-center p-6 pt-12 md:p-12 md:pt-18 text-letter">
        <div className="h-full w-full mt-4 md:p-6 relative">
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
            <h1 className="text-detail font-black text-xl sm:text-2xl md:text-5xl text-center">
              {generation.prompt}
            </h1>
            <h2 className="text-letter text-md sm:text-lg font-bold">
              TATUAGEM {generation.style.toUpperCase()}
            </h2>
            <h3 className="text-letter text-sm md:text-lg text-center py-4">
              Tatuagem criada com ajuda de nossa Inteligência Artificial (IA).
            </h3>
            <div className="mb-5 md:mb-7 w-1/4 h-px bg-detail" />

            <div className="w-full sm:w-[512px] flex items-center gap-2">
              {generation.authorId ? (
                <Link href={`/colecao?userId=${generation.authorId}`}>
                  {renderUserTag()}
                </Link>
              ) : (
                <h4>{renderUserTag()}</h4>
              )}
            </div>

            <div className="h-1/2 w-full sm:h-[512px] sm:w-[512px] hover:opacity-70 hover:cursor-pointer relative">
              <Image
                src={generation.imageUrl}
                alt={`Tatuagem gerada por inteligência artifical com o prompt: ${generation.prompt}`}
                priority
                className="rounded-md"
                onClick={() => setOpenFullscreenImageModal(true)}
                fill
                placeholder="blur"
                blurDataURL="/images/tattoo-blur-load.webp"
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>

            <div className="w-full sm:w-[512px] flex items-center justify-between mb-6">
              <span className="text-letter text-xs sm:text-sm font-light">
                {new Date(generation.createdAt).toLocaleDateString('pt-BR')}
              </span>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-letter hover:fill-detail hover:text-detail hover:cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                  <p className="font-bold text-md sm:text-xl">102</p>
                </div>

                <div className="flex items-center gap-1">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="h-8 w-8 text-letter hover:fill-red-600 hover:text-red-600 hover:cursor-pointer "
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>

                  <p className="font-bold text-md sm:text-xl">342</p>
                </div>
              </div>
            </div>
            <Link
              href="/criar"
              className="mb-3 md:mb-6 flex items-center justify-center bg-detail hover:scale-105 text-xs xs:text-sm md:text-xl sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 font-bold text-primary p-3 rounded-md"
            >
              Crie sua própria tatuagem
            </Link>
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
