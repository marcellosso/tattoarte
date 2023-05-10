import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/utils/use-prisma';
import type { Generation } from '@prisma/client';
import { FC, useMemo, useState } from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { toast } from 'react-toastify';

interface IDiscover {
  generations: Generation[];
  generationCount: number;
  style: string;
}

const Discover: FC<IDiscover> = ({ generations, generationCount, style }) => {
  const [localGenerations, setLocalGenerations] =
    useState<Generation[]>(generations);

  const [loading, setLoading] = useState(false);

  const remainingGeneration = useMemo(
    () => Math.max(generationCount - localGenerations.length, 0),
    [localGenerations, generationCount]
  );

  const generationCurrentCursor = useMemo(
    () => localGenerations.at(-1)?.id,
    [localGenerations]
  );

  const handlePaginate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/get-generations?generationCursor=${generationCurrentCursor}&generationStyle=${
          style ?? ''
        }`
      );

      setLocalGenerations([...localGenerations, ...data.generations]);
    } catch (err) {
      toast.error(err as string, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
    setLoading(false);
  };

  return (
    <main>
      <Head>
        <title>
          Explore e Descubra tatuagens criadas pela comunidade - Crie tatuagens
          únicas | TattooArtIA
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="Sua próxima tatuagem está aqui esperando por você! Explore e descubra tatuagens criadas pela comunidade e crie tattoos Únicas para você! 
          Dezenas de designs de alta qualidade criados pela comunidade, descubra um perfeito para você ou crie você mesmo!"
        />

        {/* Twitter */}

        <meta
          name="twitter:title"
          content="Explore e Descubra tatuagens criadas pela comunidade - Crie tatuagens
          únicas | TattooArtIA"
        />
        <meta
          name="twitter:description"
          content="Sua próxima tatuagem está aqui esperando por você! Explore e descubra tatuagens criadas pela comunidade e crie tattoos Únicas para você! 
          Dezenas de designs de alta qualidade criados pela comunidade, descubra um perfeito para você ou crie você mesmo!"
        />
        <meta name="twitter:creator" content="@tattooartia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.tattooartia.com/descobrir"
        />
        <meta property="twitter:domain" content="tattooartia.com" />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}images/og-tattooart.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content="Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA"
        />

        {/* Open Graph */}
        <meta
          property="og:url"
          content="https://www.tattooartia.com/descobrir"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Explore e Descubra tatuagens criadas pela comunidade - Crie tatuagens
          únicas | TattooArtIA"
        />
        <meta
          property="og:description"
          content="Sua próxima tatuagem está aqui esperando por você! Explore e descubra tatuagens criadas pela comunidade e crie tattoos Únicas para você! 
          Dezenas de designs de alta qualidade criados pela comunidade, descubra um perfeito para você ou crie você mesmo!"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}images/og-tattooart.jpg`}
        />
        <meta
          property="og:image:alt"
          content="Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA"
        />
      </Head>
      <section className="flex min-h-screen h-screen px-2 flex-col items-center pt-16 md:pt-24 pb-0 text-letter">
        <h1 className="text-md md:text-3xl font-bold text-center">
          Descubra criações de outros{' '}
          <span className="text-detail">usuários</span>!
        </h1>
        <p className="text-letter text-center text-xs md:text-lg mb-3">
          Veja o que outros estão criando usando nossa Inteligência Artificial
          (IA) artista de tatuagens!
        </p>
        <Link
          href="/criar"
          className="mb-3 flex items-center justify-center bg-detail hover:scale-105 text-sm sm:text-md md:text-lg sm:w-1/3 lg:w-1/5 font-bold text-primary p-3 rounded-md"
        >
          Crie sua própria arte
        </Link>

        <div className="bg-primary h-full w-full mt-4 rounded-md p-6 overflow-y-scroll overflow-x-hidden scrollbar-hide flex flex-col items-center gap-5">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 w-full grid-rows-none gap-5 place-items-center">
            {localGenerations.map((generation) => (
              <Link
                key={generation.id}
                href={`/tattoo/${generation.id}`}
                className="h-full w-full min-h-[174px] min-w-[174px] xs:min-h-[146px] xs:min-w-[146px] sm:min-h-[256px] sm:min-w-[256px] md:min-h-[224px] md:min-w-[224px] rounded-md md:hover:scale-105 transition-all relative group"
              >
                <Image
                  src={generation.imageUrl}
                  alt={`Tatuagem gerada por inteligência artifical com o prompt: ${generation.prompt}`}
                  className="rounded-md"
                  placeholder="blur"
                  blurDataURL="/images/tattoo-blur-load.webp"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <div className="bg-primary opacity-0 h-10 w-26 p-2 flex items-center justify-center rounded-xl absolute top-1 left-1 group-hover:opacity-100 transition-all overflow-ellipsis">
                  <span className="text-detail">{generation.style}</span>
                </div>
                <div className="bg-primary opacity-0 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0 group-hover:opacity-100 transition-all">
                  <span className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {generation.prompt}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {remainingGeneration != 0 && (
            <>
              {!loading ? (
                <button
                  className="border-detail p-2 border-2 text-letter hover:border-yellow-600 hover:text-gray-300 transition-all w-48 md:w-56 lg:w-64"
                  onClick={handlePaginate}
                >
                  Carregar mais...
                </button>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 w-full grid-rows-none gap-5 place-items-center">
                  {new Array(Math.min(remainingGeneration, 24))
                    .fill(0)
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="h-full w-full min-h-[174px] min-w-[174px] xs:min-h-[146px] xs:min-w-[146px] sm:min-h-[256px] sm:min-w-[256px] md:min-h-[224px] md:min-w-[224px] rounded-md transition-all bg-gray-400 animate-pulse"
                      />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, stale-while-revalidate=180'
  );

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

  const generationCount =
    (await prisma.generation.count({
      where: {
        is_private: false,
        style: style as string,
      },
    })) || 0;

  return {
    props: {
      generations: JSON.parse(JSON.stringify(generations)),
      generationCount,
      style: style ?? '',
    },
  };
};

export default Discover;
