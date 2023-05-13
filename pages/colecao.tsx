import Image from 'next/image';
import Link from 'next/link';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { prisma } from '@/utils/use-prisma';
import type { Generation, User } from '@prisma/client';
import { FC, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import useDebounce from '@/utils/hooks/useDebounce';
import { toast } from 'react-toastify';
import Head from 'next/head';

interface ICollection {
  user: User;
  generations: Generation[];
  isOwner: boolean;
}

const Collection: FC<ICollection> = ({ user, generations, isOwner }) => {
  const [localGenerations, setLocalGenerations] =
    useState<Generation[]>(generations);

  const [topHeaderTabs, setTopHeaderTabs] = useState('favorites');

  const debouncedLocalGenerations = useDebounce(
    localGenerations,
    1
  ) as Generation[];

  const userName = useMemo(() => {
    return generations[0]?.authorName || user.name;
  }, [user?.name, generations]);

  const userInitials = useMemo(() => {
    const name = userName || '';
    const initials = name
      .match(/(^\S\S?|\b\S)?/g)
      ?.join('')
      ?.match(/(^\S|\S$)?/g)
      ?.join('')
      .toUpperCase();

    return initials;
  }, [userName]);

  const updateLocalGenerationsState = (
    val: any,
    genId: string,
    field: string
  ) => {
    const updatedLocalGenerations = localGenerations.map((gen) => {
      if (gen.id === genId) {
        return {
          ...gen,
          [field]: val,
        };
      }

      return gen;
    });

    setLocalGenerations(updatedLocalGenerations);
  };

  const updateGenerations = async (updateGenerations: Generation[]) => {
    try {
      await axios.put('/api/generation/update', {
        updateGenerations,
        userId: user.id,
      });
    } catch (err: any) {
      toast.error(err.response?.data || err.message || err, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  useEffect(() => {
    if (isOwner) {
      // If we add new possible changes, change this method to fit that.
      // For now, we only have is_favorite as a possible change.
      const changedGenerations = debouncedLocalGenerations.filter((gen) =>
        generations.some(
          (filter) =>
            filter.id === gen.id && filter.is_favorite !== gen.is_favorite
        )
      );

      if (changedGenerations.length > 0) {
        updateGenerations(changedGenerations);
      }
    }
  }, [debouncedLocalGenerations, isOwner]);

  const renderGeneration = (mGenerations = localGenerations) => {
    return mGenerations.map((generation) => (
      <Link
        key={generation.id}
        href={`/tattoo/${generation.id}`}
        className="h-full w-full min-h-[126px] min-w-[126px] sm:min-h-[226px] sm:min-w-[226px] md:min-h-[204px] md:min-w-[204px] lg:min-h-[240px] lg:min-w-[240px] xl:min-h-[280px] xl:min-w-[280px] max-h-[280px] max-w-[280px] rounded-md transition-all relative group"
      >
        <Image
          src={generation.imageUrl}
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
        {generation.is_private && (
          <div className="h-5 w-5 sm:h-6 sm:w-6 absolute right-5 sm:right-6 lg:left-0 top-0 z-10 opacity-100 lg:group-hover:opacity-0 lg:group-hover:top-2 transition-all">
            <svg
              fill="none"
              stroke="currentColor"
              className="text-primary"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                className="fill-detail"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        )}
        <div className="bg-primary opacity-100 lg:opacity-0 h-6 sm:h-10 w-26 p-2 flex items-center justify-center sm:rounded-xl absolute top-0 left-0 sm:top-2 sm:left-2 lg:group-hover:opacity-100 transition-all overflow-ellipsis">
          <span className="text-detail text-2xs sm:text-md overflow-ellipsis overflow-hidden">
            {generation.style}
          </span>
        </div>
        <div className="bg-primary opacity-100 lg:opacity-0 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0 lg:group-hover:opacity-100 transition-all">
          <span className="text-2xs sm:text-xs overflow-ellipsis overflow-hidden whitespace-nowrap">
            {generation.prompt}
          </span>
        </div>
        {isOwner && (
          <>
            {generation.is_favorite ? (
              <div className="h-5 w-5 sm:h-6 sm:w-6 absolute right-0 top-0 z-10 transition-all lg:group-hover:top-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    updateLocalGenerationsState(
                      false,
                      generation.id,
                      'is_favorite'
                    );
                  }}
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fill-red-600 hover:fill-red-900"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
            ) : (
              <div className="h-5 w-5 sm:h-6 sm:w-6 absolute right-0 top-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all z-10 lg:group-hover:top-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    updateLocalGenerationsState(
                      true,
                      generation.id,
                      'is_favorite'
                    );
                  }}
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fill-detail hover:fill-yellow-500"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
            )}
          </>
        )}
      </Link>
    ));
  };

  return (
    <main>
      <Head>
        <title>
          Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Crie tatuagens Únicas com IA. Deixe nossa Inteligência Artificial criar tatuagens Únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta
          name="twitter:title"
          content="Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA"
        />
        <meta name="twitter:creator" content="@tattooartia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.tattooartia.com/" />
        <meta property="twitter:domain" content="tattooartia.com" />
        <meta
          name="twitter:description"
          content="Crie tatuagens Únicas com IA. Deixe nossa Inteligência Artificial criar tatuagens Únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}images/og-tattooart.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content="Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.tattooartia.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA"
        />
        <meta
          property="og:description"
          content="Crie tatuagens Únicas com IA. Deixe nossa Inteligência Artificial criar tatuagens Únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
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
      <section className="flex h-screen items-center p-2 pt-16 text-letter max-md:overflow-y-scroll md:overflow-hidden">
        <div className="flex flex-col md:flex-row h-full w-full gap-5">
          <div className="md:h-full w-full md:w-1/5 pr-2 md:border-r-2 border-detail">
            <div className="w-full h-full flex md:flex-col items-center max-md:justify-center max-md:gap-6">
              <div
                id="userAvatar"
                className="relative inline-flex items-center justify-center w-16 h-16 xs:w-20 xs:h-20 md:h-16 md:w-16 overflow-hidden rounded-full bg-detail "
              >
                <span className="text-primary font-bold max-xs:text-xs max-md:text-xl md:text-lg">
                  {userInitials}
                </span>
              </div>
              <div className="flex flex-col items-center pt-2">
                <h1 className="font-extrabold text-lg xs:text-xl lg:text-3xl">
                  {userName}
                </h1>
                <div className="h-px w-10/12 bg-detail my-2 md:my-2" />
                <div className="flex w-full gap-10 lg:gap-16 items-center justify-center md:mt-2">
                  <div className="text-center">
                    <h2 className="text-xs lg:text-sm">Tatuagens</h2>
                    <h2 className="text-xl lg:text-2xl font-extrabold text-detail">
                      {generations.length}
                    </h2>
                  </div>
                  {/* <div className="text-center">
                    <h2 className="text-xs lg:text-sm">Curtidas</h2>
                    <h2 className="text-xl lg:text-2xl font-extrabold text-detail">
                      102
                    </h2>
                  </div> */}
                </div>
              </div>
              {/* <h2 className="font-bold text-lg xs:text-xl md:text-3xl">
                Conquistas
              </h2>
              <div className="flex pt-6 w-full items-center justify-center">
                <Image
                  src={`/images/coins/bronze-coin.png`}
                  alt="Moeda de bronze com um robo cravado - Conquista de 1 tatuagem criada!"
                  width={200}
                  height={200}
                  priority
                  quality={100}
                  className="rotate-[-54.5deg]"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
                <Image
                  src={`/images/coins/silver-coin.png`}
                  alt="Moeda de prata com um robo cravado - Conquista de 5 tatuagens criada!"
                  width={200}
                  height={200}
                  priority
                  quality={100}
                  className="rotate-[-54.5deg]"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </div>
              <div className="flex pt-2 my-4 w-full items-center justify-center">
                <Image
                  src={`/images/coins/gold-coin.png`}
                  alt="Moeda de ouro com um robo cravado - Conquista de 10 tatuagem criada!"
                  width={200}
                  height={200}
                  priority
                  quality={100}
                  className="rotate-[-54.5deg]"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
                <Image
                  src={`/images/coins/platinum-coin.png`}
                  alt="Moeda de platina com um robo cravado - Conquista de 25 tatuagens criada!"
                  width={200}
                  height={200}
                  priority
                  quality={100}
                  className="rotate-[-54.5deg]"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </div>
              <Image
                src={`/images/coins/diamond-coin.png`}
                alt="Moeda de diamante com um robo cravado - Conquista de 50 tatuagens criada!"
                width={250}
                height={250}
                priority
                quality={100}
                className="rotate-[-54.5deg]"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              /> */}
            </div>
          </div>
          <div className="h-fullw-full md:w-4/5 mb-12">
            <div className="flex gap-6">
              <h3
                className={`font-bold text-3xl ${
                  topHeaderTabs == 'favorites'
                    ? 'opacity-100'
                    : 'opacity-50 hover:cursor-pointer hover:opacity-80 transition-all duration-100 ease-in'
                }`}
              >
                Favoritas
              </h3>
              {/* <h3
                className={`font-bold text-4xl ${
                  topHeaderTabs == 'bookmarks'
                    ? 'opacity-100'
                    : 'opacity-50 hover:cursor-pointer hover:opacity-80 transition-all duration-100 ease-in'
                }`}
              >
                Salvas
              </h3> */}
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="h-px w-1/4 bg-detail mb-3" />
              {/* <p className="max-md:text-sm">Ver todas</p> */}
            </div>
            <div className="w-full flex gap-6 overflow-x-auto scrollbar-custom mb-4 pb-2">
              {renderGeneration(localGenerations.filter((l) => l.is_favorite))}
            </div>
            <h3
              className={`font-bold text-3xl ${
                topHeaderTabs == 'favorites'
                  ? 'opacity-100'
                  : 'opacity-50 hover:cursor-pointer hover:opacity-80 transition-all duration-100 ease-in'
              }`}
            >
              Todas
            </h3>
            <div className="flex justify-between w-full items-center">
              <div className="h-px w-1/4 bg-detail mb-2" />
              {/* <p className="max-md:text-sm">Ver todas</p> */}
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 pb-6 md:pb-2 w-full h-full grid-rows-none gap-3 sm:gap-5 md:overflow-y-auto scrollbar-hide place-items-center">
              {renderGeneration()}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { req, res, query } = context;
    const session = await getSession(req, res);
    const sessionUser = session!.user || {};

    const user = (await prisma.user.findUnique({
      where: {
        email: sessionUser.email as string,
      },
    })) as User;

    const queryId = query?.userId || user?.id;

    let generationsFromUser = [] as Generation[];

    const isSameUser = queryId == user?.id;

    generationsFromUser =
      (await prisma.generation.findMany({
        where: {
          authorId: queryId as string,
          is_private: !isSameUser ? false : undefined,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      })) || [];

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        generations: JSON.parse(JSON.stringify(generationsFromUser)),
        isOwner: isSameUser,
      },
    };
  },
});

export default Collection;
