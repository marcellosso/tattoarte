import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/utils/use-prisma';
import { Generation, User } from '@prisma/client';
import { FC } from 'react';
import MainNavbar from '@/components/navbars/main-navbar';
import { GetServerSidePropsContext } from 'next';
import tattooStyles from '@/assets/tattoo-styles';

interface IEstilos {
  generationCount: Record<string, number>;
}

const Estilos: FC<IEstilos> = ({ generationCount }) => {
  return (
    <>
      <MainNavbar />
      <main className="flex min-h-screen h-screen flex-col items-center pt-24 pb-0 bg-secondary text-letter ">
        <h1 className="text-3xl font-bold">
          <span className="text-detail">Estilos</span> de tatuagem
        </h1>
        <p className="text-letter font-md">
          Veja todos os estilos disponíveis para utilizar com nosso{' '}
          <span className="text-detail">artista</span> IA.
        </p>
        <p className="text-letter font-md mb-6">
          Observe milhares de designs unícos e de alta qualidade, descubra o
          ideal para você ou crie um você mesmo!
        </p>
        <Link
          href="/criar"
          className="mb-3 flex items-center justify-center bg-detail hover:scale-105 text-lg bg-gradient-to-r w-1/5 font-bold text-primary p-3 rounded-md"
        >
          Crie sua própria arte
        </Link>

        <div className="bg-primary h-full w-full mt-4 rounded-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:md:grid-cols-6 w-full h-full grid-rows-none gap-5">
            {tattooStyles.map((style) => {
              return (
                <Link
                  key={style}
                  href={`/descobrir?estilo=${style}`}
                  className="h-[256px] w-[256px] rounded-md hover:scale-105 relative group bg-secondary p-2"
                >
                  <div className="h-[220px] w--full relative">
                    <Image
                      src={`/images/estilos/${style.toLowerCase()}.jpg`}
                      alt={`Tatuagem com estilo: ${style}`}
                      objectFit="cover"
                      layout="fill"
                      priority
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-detail font-bold">{style}</span>
                    <span className="text-letter">
                      {generationCount[style]}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const generationCount = {} as Record<string, number>;

  await Promise.all(
    tattooStyles.map(async (style) => {
      generationCount[style] = await prisma.generation.count({
        where: {
          style: style as string,
        },
      });
    })
  );

  return {
    props: {
      generationCount: generationCount,
    },
  };
};

export default Estilos;
