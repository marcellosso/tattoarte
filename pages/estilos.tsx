import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/utils/use-prisma';
import { FC } from 'react';
import tattooStyles from '@/assets/tattoo-styles';
import Head from 'next/head';
interface IEstilos {
  generationCount: Record<string, number>;
}

const Estilos: FC<IEstilos> = ({ generationCount }) => {
  return (
    <main>
      <Head>
        <title>
          Explore todos os estilos de tatuagens disponiveis - Crie tatuagens
          únicas | TattooArtIA
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="Sua próxima tatuagem está aqui esperando por você! 
          Explore e descubra os diversos estilos de tattoo disponiveis para nossa IA utilizar e criar um design perfeito para sua tatuagem!"
        />

        {/* Twitter */}

        <meta
          name="twitter:title"
          content="Explore todos os estilos de tatuagens disponiveis - Crie tatuagens
          únicas | TattooArtIA"
        />
        <meta
          name="twitter:description"
          content="Sua próxima tatuagem está aqui esperando por você! 
          Explore e descubra os diversos estilos de tattoo disponiveis para nossa IA utilizar e criar um design perfeito para sua tatuagem!"
        />
        <meta name="twitter:creator" content="@tattooartia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="tattooartia.com" />
        <meta
          property="twitter:url"
          content="https://www.tattooartia.com/estilos"
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}images/og-tattooart.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content="Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA"
        />

        {/* Open Graph */}
        <meta property="og:url" content="https://www.tattooartia.com/estilos" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Explore todos os estilos de tatuagens disponiveis - Crie tatuagens
          únicas | TattooArtIA"
        />
        <meta
          property="og:description"
          content="Sua próxima tatuagem está aqui esperando por você! 
          Explore e descubra os diversos estilos de tattoo disponiveis para nossa IA utilizar e criar um design perfeito para sua tatuagem!"
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
      <section className="flex flex-col font-normal items-center px-2 pt-16 md:pt-24 text-letter">
        <h1 className="text-md xs:text-xl md:text-4xl font-bold text-center">
          <span className="text-detail">Estilos</span> de tatuagem
        </h1>
        <h2 className="text-letter text-center text-xs xs:text-sm md:text-lg mb-2 md:mb-0">
          Veja todos os estilos disponíveis para utilizar com nosso{' '}
          <span className="text-detail">artista</span> IA.
        </h2>
        <h2 className="text-letter text-center text-xs xs:text-sm md:text-lg mb-3">
          Observe milhares de designs unícos e de alta qualidade, descubra o
          ideal para você ou crie um você mesmo!
        </h2>
        <Link
          href="/criar"
          className="mb-3 flex items-center font-bold justify-center bg-detail hover:scale-105 text-sm sm:text-md md:text-lg sm:w-1/3 lg:w-1/6 text-primary p-2 rounded-md"
        >
          Crie sua própria arte
        </Link>

        <div className="h-full w-full mt-4 rounded-md p-6">
          <div className="flex w-full items-center justify-between mb-2">
            <h3 className="font-medium text-sm sm:text-md md:text-3xl">
              Encontre seu estilo favorito
            </h3>
            <div className="bg-detail h-0.5 w-1/2" />
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 w-full h-full grid-rows-none gap-5 place-items-center">
            {tattooStyles.map((style) => {
              return (
                <Link
                  key={style}
                  href={`/descobrir?estilo=${style}`}
                  className="
                    rounded-md relative p-2
                    h-full w-full min-h-[174px] min-w-[174px] 
                    xs:min-h-[146px] xs:min-w-[146px] 
                    sm:min-h-[256px] sm:min-w-[256px] 
                    md:min-h-[224px] md:min-w-[224px] 
                  "
                >
                  <div className="h-5/6 min-h-[144px] xs:min-h-[116px] sm:min-h-[226px] md:min-h-[194px] w-full relative">
                    <Image
                      src={`/images/estilos/${style.toLowerCase()}.jpg`}
                      alt={`Tatuagem com estilo: ${style}`}
                      priority
                      className="rounded-md hover:opacity-60 transition-all duration-200"
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-detail font-bold text-xs xs:text-sm">
                      {style}
                    </span>
                    <span className="text-letter font-black text-xs xs:text-sm">
                      {generationCount[style] || 0}
                    </span>
                  </div>
                  <div className="bg-detail h-px w-1/2 mt-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export const getStaticProps = async () => {
  const generationCount = {} as Record<string, number>;

  const countedGeneration = await prisma.generation.groupBy({
    by: ['style'],
    _count: {
      _all: true,
    },
  });

  countedGeneration.forEach((el) => {
    generationCount[el.style] = el._count._all;
  });

  return {
    props: {
      generationCount,
    },
    revalidate: 60,
  };
};

export default Estilos;
