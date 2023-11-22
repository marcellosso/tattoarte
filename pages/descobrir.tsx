import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/utils/use-prisma';
import type { Generation } from '@prisma/client';
import { FC, useState } from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { toast } from 'react-toastify';
import tattooStyles from '@/assets/tattoo-styles';

const LINK_BEFORE_CSS =
  'before:absolute before:bottom-0 before:left-0 before:bg-letter before:h-px before:w-1/3 before:translate-x-full';

interface IOrderBy {
  handleOrderByChange: (_v: keyof Generation) => void;
}

const OrderBy: FC<IOrderBy> = ({ handleOrderByChange }) => {
  const [open, setOpen] = useState(false);

  const handleChangeOrder = (newOrderBy: string) => {
    setOpen(false);
    handleOrderByChange(newOrderBy as keyof Generation);
  };

  return (
    <div className="relative flex">
      <button onClick={() => setOpen(!open)}>
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          className="h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 text-letter cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
          />
        </svg>
      </button>
      {open && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        id="orderDropdown"
        className={`z-100 top-10 absolute rounded-md shadow bg-primary ${
          open ? 'block' : 'hidden'
        }`}
      >
        <ul
          className="pb-2 pt-1 text-sm text-letter"
          aria-labelledby="userAvatar"
        >
          <li className="mb-2 relative">
            <button
              onClick={() => handleChangeOrder('createdAt')}
              className={`text-sm whitespace-nowrap px-4 py-2 text-letter hover:bg-gray-600 text-left ${LINK_BEFORE_CSS}`}
            >
              Mais Recentes
            </button>
          </li>

          <li className="mb-2 relative">
            <button
              onClick={() => handleChangeOrder('likes')}
              className={`text-sm w-full whitespace-nowrap px-4 py-2 text-letter hover:bg-gray-600 text-left ${LINK_BEFORE_CSS}`}
            >
              Mais Curtidas
            </button>
          </li>
          <li className="mb-2 relative">
            <button
              onClick={() => handleChangeOrder('bookmarks')}
              className={`text-sm w-full whitespace-nowrap px-4 py-2 text-letter hover:bg-gray-600 text-left ${LINK_BEFORE_CSS}`}
            >
              Mais Salvas
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

interface IDiscover {
  generations: Generation[];
  generationCount: number;
  style: string;
}

const Discover: FC<IDiscover> = ({ generations, generationCount, style }) => {
  const [localGenerations, setLocalGenerations] =
    useState<Generation[]>(generations);

  const [localStyle, setLocalStyle] = useState(style || '');

  const [loadingPagination, setLoadingPagination] = useState(false);
  const [loadingStyleChange, setLoadingStyleChange] = useState(false);

  const [generationCurrentCursor, setGenerationCurrentCursor] = useState(
    localGenerations.at(-1)?.id
  );

  const orderGenerations = (
    orderBy: keyof Generation,
    mGenerations: Generation[]
  ) => {
    let newGenerations = [...mGenerations];
    if (orderBy == 'createdAt') {
      newGenerations = newGenerations.sort((a, b) =>
        (b[orderBy] as unknown as string)?.localeCompare(
          a[orderBy] as unknown as string
        )
      );
    } else {
      newGenerations = newGenerations.sort(
        (a, b) =>
          (b[orderBy] as unknown as number) - (a[orderBy] as unknown as number)
      );
    }

    return newGenerations;
  };

  const handleOrderByChange = (orderBy: keyof Generation) => {
    const newGenerations = orderGenerations(orderBy, localGenerations);

    setLocalGenerations(newGenerations);
  };

  const handlePullNewGenerations = async (
    localGenerationCurrentCursor = generationCurrentCursor,
    mStyle = localStyle
  ) => {
    try {
      const { data } = await axios.get(
        `/api/get-generations?generationCursor=${localGenerationCurrentCursor}&generationStyle=${
          mStyle ?? ''
        }`
      );

      return data.generations;
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
  };

  const handlePaginate = async () => {
    setLoadingPagination(true);
    const newGenerations = await handlePullNewGenerations(
      generationCurrentCursor,
      localStyle
    );

    setLocalGenerations([...localGenerations, ...newGenerations]);
    setGenerationCurrentCursor(
      [...localGenerations, ...newGenerations].at(-1)?.id
    );
    setLoadingPagination(false);
  };

  const handleOnStyleChange = async (newStyle: string) => {
    setLoadingStyleChange(true);
    const newGenerations = await handlePullNewGenerations('', newStyle);

    setLocalGenerations(newGenerations);
    setGenerationCurrentCursor(newGenerations.at(-1)?.id);
    setLoadingStyleChange(false);
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
      <section className="flex px-2 flex-col items-center pt-16 md:pt-24 pb-0 text-letter">
        <h1 className="text-md sm:text-2xl  md:text-4xl font-bold text-center">
          Descubra criações de outros{' '}
          <span className="text-detail">usuários</span>!
        </h1>
        <h2 className="text-letter text-center text-xs md:text-lg mb-3">
          Veja o que outros estão criando usando nossa Inteligência Artificial
          (IA) artista de tatuagens!
        </h2>
        <Link
          href="/criar"
          className="mb-3 flex items-center font-bold justify-center bg-detail hover:scale-105 text-sm sm:text-md md:text-lg sm:w-1/3 lg:w-1/6 text-primary p-2 rounded-md"
        >
          Crie sua própria arte
        </Link>

        <div className="h-full w-full mt-4 rounded-md p-6 flex flex-col items-center gap-5 ">
          <div className="flex w-full items-center justify-between mb-2 gap-5">
            <div className="flex items-end justify-center gap-2 md:gap-5">
              <div>
                <label
                  htmlFor="estilos"
                  className="block mb-2 text-xs md:text-sm font-normal text-letter"
                >
                  Estilos
                </label>
                <select
                  id="estilos"
                  disabled={!!style}
                  value={localStyle}
                  onChange={(e) => {
                    const newStyle = e.target.value;
                    setLocalStyle(newStyle);
                    handleOnStyleChange(newStyle);
                  }}
                  className="border bg-primary text-2xs xs:text-xs md:text-sm rounded-md block w-full p-1 xs:p-2 md:p-2.5  border-letter placeholder-gray-400 text-letter focus:border-detail"
                >
                  <option value="" className="py-4">
                    Todos
                  </option>
                  {tattooStyles.map((tattoo, idx) => (
                    <option key={idx} value={tattoo} className="py-4">
                      {tattoo}
                    </option>
                  ))}
                </select>
              </div>
              <OrderBy handleOrderByChange={handleOrderByChange} />
            </div>
            <div className="flex flex-col w-1/2">
              <h3 className="font-extrabold test-sm xs:text-lg md:text-4xl text-end">
                {generationCount}
              </h3>
              <h4 className="font-bold text-xs xs:text-sm md:text-xl text-end whitespace-nowrap">
                Tatuagens criadas
              </h4>
              <div className="bg-detail h-0.5" />
            </div>
          </div>

          {!loadingStyleChange && (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 w-full grid-rows-none gap-5 place-items-center">
              {localGenerations.map((generation) => (
                <Link
                  key={generation.id}
                  href={`/tattoo/${generation.id}`}
                  className="h-full w-full min-h-[174px] min-w-[174px] xs:min-h-[146px] xs:min-w-[146px] sm:min-h-[256px] sm:min-w-[256px] md:min-h-[224px] md:min-w-[224px] rounded-md transition-all relative group"
                >
                  <Image
                    unoptimized
                    src={generation?.imageUrl || ''}
                    alt={`Tatuagem gerada por inteligência artifical com o prompt: ${generation.prompt}`}
                    className="rounded-md md:hover:opacity-60 transition-all duration-200"
                    placeholder="blur"
                    blurDataURL="/images/blur-image.jpg"
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
          )}

          {!loadingPagination &&
            !loadingStyleChange &&
            localGenerations.length > 0 && (
              <button
                className="border-detail p-2 border-2 text-letter hover:border-yellow-600 hover:text-gray-300 transition-all w-48 md:w-56 lg:w-64"
                onClick={handlePaginate}
              >
                Carregar mais...
              </button>
            )}

          {(loadingPagination || loadingStyleChange) && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 animate-spin text-gray-600 fill-detail"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
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

  const generationsResp =
    (await prisma.generation.findMany({
      where: {
        is_private: false,
        style: style as string,
      },
      select: {
        id: true,
        style: true,
        prompt: true,
        imageUrl: true,
        createdAt: true,
        _count: {
          select: { likes: true, bookmarks: true },
        },
      },
      take: 24,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })) || [];

  const generations = generationsResp.map((generation) => {
    return {
      id: generation.id,
      style: generation.style,
      prompt: generation.prompt,
      imageUrl: generation.imageUrl,
      createdAt: generation.createdAt,
      likes: generation._count.likes,
      bookmarks: generation._count.bookmarks,
    };
  });

  const generationCount =
    (await prisma.generation.count({
      where: {
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
