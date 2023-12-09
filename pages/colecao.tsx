/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/utils/use-prisma';
import { FC, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import useDebounce from '@/utils/hooks/useDebounce';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import type { Generation } from '@prisma/client';
import { clerkClient, getAuth } from '@clerk/nextjs/server';

interface IAchievmentModal {
  selectedCoin: string;
  setSelectedCoin: (_c: null) => void;
  showProgressBar: boolean;
  createdTattoosCount: number;
}

const AchievmentModal: FC<IAchievmentModal> = ({
  selectedCoin,
  setSelectedCoin,
  showProgressBar,
  createdTattoosCount,
}) => {
  const coinName = useMemo(() => {
    if (selectedCoin == 'bronze-coin') return 'Moeda de Bronze';
    if (selectedCoin == 'silver-coin') return 'Moeda de Prata';
    if (selectedCoin == 'gold-coin') return 'Moeda de Ouro';
    if (selectedCoin == 'platinum-coin') return 'Moeda de Platina';
    return 'Moeda de Diamante';
  }, [selectedCoin]);

  const coinObjective = useMemo(() => {
    if (selectedCoin == 'bronze-coin') return 4;
    if (selectedCoin == 'silver-coin') return 20;
    if (selectedCoin == 'gold-coin') return 40;
    if (selectedCoin == 'platinum-coin') return 200;
    return 400;
  }, [selectedCoin]);

  const coinCompletedPercent = useMemo(() => {
    return Math.min((createdTattoosCount / coinObjective) * 100, 100);
  }, [createdTattoosCount, coinObjective]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={() => setSelectedCoin(null)}
    >
      <div
        className="animatedModal bg-secondary p-6 w-full sm:w-1/2 lg:w-1/3 my-2 md:my-0 rounded-lg
        flex flex-col items-center justify-center gap-8 relative"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          onClick={() => setSelectedCoin(null)}
          height={32}
          width={32}
          className="text-letter absolute right-0 top-0 hover:text-detail hover:cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div className="md:mt-4">
          <Image
            unoptimized
            src={`/images/coins/${selectedCoin}.png`}
            alt={`${coinName} com um robo cravado - Conquista de ${coinObjective} tatuagens criadas!`}
            width={350}
            height={350}
            priority
            quality={100}
            className="rotate-[-54.5deg] opacity-100"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div>
          <h1 className="text-detail text-2xl font-extrabold text-center">
            {coinName}
          </h1>
          <p className="text-letter text-lg text-center">
            Objetivo: Crie {coinObjective} tatuagens para conquistar essa moeda!
          </p>
        </div>
        {showProgressBar && (
          <div className="w-full">
            <div className="flex justify-between mb-1 w-full">
              <span className="text-base font-medium text-letter ">
                Progresso
              </span>
              <span className="text-sm font-medium text-letter ">
                {coinCompletedPercent}%
              </span>
            </div>
            <div className="w-full  rounded-full h-2.5 bg-primary">
              <div
                className="bg-detail h-2.5 rounded-full"
                style={{ width: `${coinCompletedPercent}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type UserCoins = {
  hasBronzeCoin: boolean;
  hasSilverCoin: boolean;
  hasGoldCoin: boolean;
  hasPlatinumCoin: boolean;
  hasDiamondCoin: boolean;
};

type DraftGeneration = Partial<Generation>;

interface ICollection {
  userName: string;
  userCoins: UserCoins;
  generations: DraftGeneration[];
  bookmarkedGenerations: Generation[];
  likeCount: number;
  isOwner: boolean;
}

const Collection: FC<ICollection> = ({
  userName,
  userCoins,
  generations,
  bookmarkedGenerations,
  likeCount,
  isOwner,
}) => {
  const dynamicRoute = useRouter().asPath;

  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [localGenerations, setLocalGenerations] =
    useState<DraftGeneration[]>(generations);

  const favoriteLocalGenerations = useMemo(
    () => localGenerations.filter((l) => l.is_favorite),
    [localGenerations]
  );

  const [topHeaderTabs, setTopHeaderTabs] = useState(
    favoriteLocalGenerations.length > 0 ? 'favorites' : 'bookmarks'
  );
  const [showDefaultDisplay, setShowDefaultDisplay] = useState(isOwner);

  const debouncedLocalGenerations = useDebounce(
    localGenerations,
    1
  ) as DraftGeneration[];

  const localUserName = useMemo(() => {
    return generations[0]?.authorName || userName;
  }, [userName, generations]);

  const userInitials = useMemo(() => {
    const name = localUserName || '';
    const initials = name
      .match(/(^\S\S?|\b\S)?/g)
      ?.join('')
      ?.match(/(^\S|\S$)?/g)
      ?.join('')
      .toUpperCase();

    return initials;
  }, [localUserName]);

  const updateLocalGenerationsState = (
    val: boolean,
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

  const updateGenerations = async (updateGenerations: DraftGeneration[]) => {
    try {
      await axios.put('/api/generation/update', {
        updateGenerations,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const changedGenerations = localGenerations.filter((gen) =>
      generations.every((el) => el.id !== gen.id)
    );

    if (changedGenerations.length > 0) setLocalGenerations(generations);
  }, [dynamicRoute]);

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

  const renderGeneration = (
    mGenerations = localGenerations,
    hideImageDetails = false
  ) => {
    return mGenerations.map((generation) => (
      <Link
        key={generation.id}
        href={`/tattoo/${generation.id}`}
        className="h-full w-full min-h-[126px] min-w-[126px] sm:min-h-[226px] sm:min-w-[226px] md:min-h-[204px] md:min-w-[204px] lg:min-h-[240px] lg:min-w-[240px] xl:min-h-[280px] xl:min-w-[280px] max-h-[280px] max-w-[280px] rounded-md transition-all relative group"
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
        {generation.is_private && !hideImageDetails && (
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
        {isOwner && !hideImageDetails && (
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
                      generation?.id || '',
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
                      generation?.id || '',
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
          {selectedCoin && (
            <AchievmentModal
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
              showProgressBar={isOwner}
              createdTattoosCount={generations.length}
            />
          )}
          <div className="md:h-full w-full md:w-1/5 pr-2 md:border-r-2 border-detail">
            <div>
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
                    {localUserName}
                  </h1>
                  <div className="h-px w-10/12 bg-detail my-2 md:my-2" />
                  <div className="flex w-full gap-10 lg:gap-16 items-center justify-center md:mt-2">
                    <div className="text-center">
                      <h2 className="text-xs lg:text-sm">Tatuagens</h2>
                      <h2 className="text-xl lg:text-2xl font-extrabold text-detail">
                        {generations.length}
                      </h2>
                    </div>
                    <div className="text-center">
                      <h2 className="text-xs lg:text-sm">Curtidas</h2>
                      <h2 className="text-xl lg:text-2xl font-extrabold text-detail">
                        {likeCount}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="font-bold text-xs xs:text-sm md:text-3xl mt-6 text-center">
                Conquistas
              </h2>
              <div className="flex flex-row md:flex-col md:gap-6 md:mt-2 items-center justify-center">
                <div className="flex md:gap-2 w-full items-center justify-center">
                  <div>
                    <Image
                      unoptimized
                      src={`/images/coins/bronze-coin.png`}
                      alt="Moeda de bronze com um robo cravado - Conquista de 1 tatuagem criada!"
                      width={300}
                      height={300}
                      priority
                      quality={100}
                      onClick={() => setSelectedCoin('bronze-coin')}
                      className={`rotate-[-54.5deg] cursor-pointer ${
                        userCoins.hasBronzeCoin ? 'opacity-100' : 'opacity-30'
                      }`}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </div>
                  <div>
                    <Image
                      unoptimized
                      src={`/images/coins/silver-coin.png`}
                      alt="Moeda de prata com um robo cravado - Conquista de 5 tatuagens criada!"
                      width={300}
                      height={300}
                      priority
                      quality={100}
                      onClick={() => setSelectedCoin('silver-coin')}
                      className={`rotate-[-54.5deg] cursor-pointer ${
                        userCoins.hasSilverCoin ? 'opacity-100' : 'opacity-30'
                      }`}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </div>
                </div>
                <div className="flex md:gap-2 w-full items-center justify-center">
                  <div>
                    <Image
                      unoptimized
                      src={`/images/coins/gold-coin.png`}
                      alt="Moeda de ouro com um robo cravado - Conquista de 10 tatuagem criada!"
                      width={300}
                      height={300}
                      priority
                      quality={100}
                      onClick={() => setSelectedCoin('gold-coin')}
                      className={`rotate-[-54.5deg] cursor-pointer ${
                        userCoins.hasGoldCoin ? 'opacity-100' : 'opacity-30'
                      }`}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </div>
                  <div>
                    <Image
                      unoptimized
                      src={`/images/coins/platinum-coin.png`}
                      alt="Moeda de platina com um robo cravado - Conquista de 25 tatuagens criada!"
                      width={300}
                      height={300}
                      priority
                      quality={100}
                      onClick={() => setSelectedCoin('platinum-coin')}
                      className={`rotate-[-54.5deg] cursor-pointer ${
                        userCoins.hasPlatinumCoin ? 'opacity-100' : 'opacity-30'
                      }`}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Image
                    unoptimized
                    src={`/images/coins/diamond-coin.png`}
                    alt="Moeda de diamante com um robo cravado - Conquista de 50 tatuagens criada!"
                    width={350}
                    height={350}
                    priority
                    quality={100}
                    onClick={() => setSelectedCoin('diamond-coin')}
                    className={`rotate-[-54.5deg] cursor-pointer ${
                      userCoins.hasDiamondCoin ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-full md:w-4/5 mb-12">
            {showDefaultDisplay &&
              (favoriteLocalGenerations.length > 0 ||
                bookmarkedGenerations.length > 0) && (
                <>
                  <div className="flex gap-6">
                    <button
                      onClick={() => setTopHeaderTabs('favorites')}
                      className={`font-bold text-2xl md:text-3xl ${
                        topHeaderTabs == 'favorites'
                          ? 'opacity-100'
                          : 'opacity-50 hover:cursor-pointer hover:opacity-80 transition-all duration-100 ease-in'
                      }`}
                    >
                      Favoritas
                    </button>
                    <button
                      onClick={() => setTopHeaderTabs('bookmarks')}
                      className={`font-bold text-2xl md:text-3xl ${
                        topHeaderTabs == 'bookmarks'
                          ? 'opacity-100'
                          : 'opacity-50 hover:cursor-pointer hover:opacity-80 transition-all duration-100 ease-in'
                      }`}
                    >
                      Salvas
                    </button>
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <div className="h-px w-1/4 bg-detail mb-3" />
                  </div>
                  <div className="w-full flex gap-6 overflow-x-auto scrollbar-custom mb-4 pb-2">
                    {renderGeneration(
                      topHeaderTabs == 'favorites'
                        ? favoriteLocalGenerations
                        : bookmarkedGenerations,
                      topHeaderTabs != 'favorites'
                    )}
                  </div>
                </>
              )}
            <h3 className="font-bold text-2xl md:text-3xl">Todas</h3>
            <div className="flex justify-between w-full items-center">
              <div className="h-px w-1/4 bg-detail mb-2" />
              {isOwner && generations.length > 0 && (
                <button
                  className="max-md:text-sm hover:text-detail transition-all duration-200"
                  onClick={() => setShowDefaultDisplay(!showDefaultDisplay)}
                >
                  {showDefaultDisplay ? 'Ver todas' : 'Esconder'}
                </button>
              )}
            </div>
            {localGenerations.length > 0 ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 pb-6 md:pb-2 w-full h-full grid-rows-none gap-3 sm:gap-5 md:overflow-y-auto scrollbar-hide">
                {renderGeneration()}
              </div>
            ) : (
              <div className="h-1/2 w-full flex flex-col items-center justify-center">
                <p className="text-xl text-letter font-extrabold mb-2">
                  Não há tatuagens criadas!
                </p>
                <Link
                  href="/criar"
                  className="font-bold text-primary text-center text-xs sm:text-sm md:text-lg p-3 px-6 rounded-md bg-detail hover:bg-yellow-500"
                >
                  Crie sua arte agora
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;
  const { userId } = await getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : undefined;

  const userName = `${user?.firstName} ${user?.lastName}` ?? '';

  const queryId = query?.userId || user?.externalId;

  if (!queryId) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  let generationsFromUser = [] as (DraftGeneration & {
    _count: { likes: number };
    author: UserCoins | null;
  })[];

  const isSameUser = queryId == user?.externalId;

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
      select: {
        id: true,
        authorName: true,
        is_favorite: true,
        is_private: true,
        imageUrl: true,
        prompt: true,
        style: true,
        author: {
          select: {
            hasBronzeCoin: true,
            hasSilverCoin: true,
            hasGoldCoin: true,
            hasPlatinumCoin: true,
            hasDiamondCoin: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    })) || [];

  let bookmarkedGenerations = [] as Generation[];

  if (isSameUser) {
    const bookmarkedRes = await prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
      select: {
        generation: true,
      },
    });

    bookmarkedGenerations = bookmarkedRes.map(
      (bookmark) => bookmark.generation
    );
  }

  const likesCountForUser = generationsFromUser.reduce((acc, generation) => {
    return acc + generation._count.likes;
  }, 0);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const userCoins = generationsFromUser[0]?.author! || {};

  return {
    props: {
      userName,
      userCoins: JSON.parse(JSON.stringify(userCoins)),
      generations: JSON.parse(JSON.stringify(generationsFromUser)),
      bookmarkedGenerations: JSON.parse(JSON.stringify(bookmarkedGenerations)),
      likeCount: likesCountForUser,
      isOwner: isSameUser,
    },
  };
};

export default Collection;
