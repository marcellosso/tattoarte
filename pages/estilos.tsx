import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/utils/use-prisma';
import { FC } from 'react';
import MainNavbar from '@/components/navbars/main-navbar';
import tattooStyles from '@/assets/tattoo-styles';
interface IEstilos {
  generationCount: Record<string, number>;
}

const Estilos: FC<IEstilos> = ({ generationCount }) => {
  return (
    <main>
      <MainNavbar />
      <section className="flex min-h-screen h-screen flex-col items-center px-2 pt-16 md:pt-24 pb-0 bg-secondary text-letter">
        <h1 className="text-md md:text-3xl font-bold text-center">
          <span className="text-detail">Estilos</span> de tatuagem
        </h1>
        <p className="text-letter text-center text-xs md:text-lg mb-2 md:mb-0">
          Veja todos os estilos disponíveis para utilizar com nosso{' '}
          <span className="text-detail">artista</span> IA.
        </p>
        <p className="text-letter text-center text-xs md:text-lg mb-3">
          Observe milhares de designs unícos e de alta qualidade, descubra o
          ideal para você ou crie um você mesmo!
        </p>
        <Link
          href="/criar"
          className="mb-3 flex items-center justify-center bg-detail hover:scale-105 text-sm sm:text-md md:text-lg sm:w-1/3 lg:w-1/5 font-bold text-primary p-3 rounded-md"
        >
          Crie sua própria arte
        </Link>

        <div className="bg-primary h-full w-full mt-4 rounded-md p-6 overflow-y-scroll overflow-x-hidden scrollbar-hide">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 w-full h-full grid-rows-none gap-5 place-items-center">
            {tattooStyles.map((style) => {
              return (
                <Link
                  key={style}
                  href={`/descobrir?estilo=${style}`}
                  // className="h-[256px] w-[256px] rounded-md hover:scale-105 relative bg-secondary p-2"
                  className="h-[174px] w-[174px] xs:h-[146px] xs:w-[146px] sm:h-[256px] sm:w-[256px] md:h-[224px] md:w-[224px] rounded-md hover:scale-105 relative bg-secondary p-2"
                >
                  <div className="h-[144px] xs:h-[116px] sm:h-[226px] md:h-[194px] w-full relative">
                    <Image
                      src={`/images/estilos/${style.toLowerCase()}.jpg`}
                      alt={`Tatuagem com estilo: ${style}`}
                      priority
                      className="rounded-md"
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-detail font-bold text-2xs xs:text-xs md:text-md">
                      {style}
                    </span>
                    <span className="text-letter">
                      {generationCount[style]}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
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
