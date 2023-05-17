import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/utils/use-prisma';
import { FC, useMemo, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSession, Session } from '@auth0/nextjs-auth0';
import { toggleLike, toggleBookmark } from '@/utils/toggle-options';
import { toast } from 'react-toastify';
import Logo from '@/components/logo';
import { useUser } from '@auth0/nextjs-auth0/client';

import { isMobile } from 'react-device-detect';

type CustomGeneration = {
  id: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  prompt: string;
  imageUrl: string;
  style: string;
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
  bookmarkCount: number;
};

interface ITattoo {
  generation: CustomGeneration;
}

const Tattoo: FC<ITattoo> = ({ generation }) => {
  const { user } = useUser();

  const [openFullscreenImageModal, setOpenFullscreenImageModal] =
    useState(false);
  const [openNotLoggedModal, setOpenNotLoggedModal] = useState(false);

  const [isLiked, setIsLiked] = useState(generation?.isLiked);
  const [likeCount, setLikeCount] = useState(generation?.likeCount);
  const [isBookmarked, setIsBookmarked] = useState(generation?.isBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState(generation?.bookmarkCount);

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

  const invokeToastError = (error: string) => {
    toast.error(error, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const handleToggleLike = async () => {
    if (!user) {
      setOpenNotLoggedModal(true);
      return;
    }

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      await toggleLike(generation?.id);
    } catch (err) {
      invokeToastError(err as string);
    }
  };

  const handleToggleBookmark = async () => {
    if (!user) {
      setOpenNotLoggedModal(true);
      return;
    }

    setIsBookmarked(!isBookmarked);
    setBookmarkCount(isBookmarked ? bookmarkCount - 1 : bookmarkCount + 1);

    try {
      await toggleBookmark(generation?.id);
    } catch (err) {
      invokeToastError(err as string);
    }
  };

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

  const renderUserTag = (isLink = false) => (
    <div className="flex items-end gap-2 mb-2 group">
      <div
        id="userAvatar"
        className={`
        inline-flex items-center justify-center w-8 h-8 xs:w-12 xs:h-12 overflow-hidden rounded-md bg-letter 
        ${
          isLink
            ? 'group-hover:bg-detail group-hover:cursor-pointer transition-all duration-300'
            : ''
        } 
        `}
      >
        <span className="text-primary font-bold text-xs xs:text-lg">
          {userInitials}
        </span>
      </div>
      <h4
        className={`
      text-letter text-xl sm:text-3xl font-extrabold 
      ${
        isLink
          ? 'group-hover:cursor-pointer group-hover:text-detail transition-all duration-300'
          : ''
      }
      `}
      >
        {generation?.authorName}
      </h4>
    </div>
  );

  const handleShare = () => {
    if (isMobile) {
      navigator.share({
        url: document.URL,
        title: `${generation.prompt} - Tatuagem gerada por IA - Crie a sua tattoo |
        TattooArtIA`,
        text: 'Dê uma olhada nessa tatuagem criada usando uma inteligência artificial!',
      });
    } else {
      navigator.clipboard.writeText(
        `Dê uma olhada nessa tatuagem criada usando uma inteligência artificial!\n${document.URL}`
      );
      toast.info('Copiado para a área de transferência', {
        position: 'top-center',
        autoClose: 1000,
        icon: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        style: { color: '#EEEEEE', fontWeight: 500 },
        theme: 'dark',
      });
    }
  };

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
              <div className="animatedModal w-[1024px] h-5/6 my-2 md:my-0 rounded-md flex items-center justify-center relative">
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
          {openNotLoggedModal && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-50 flex items-center justify-center"
              onClick={() => setOpenNotLoggedModal(false)}
            >
              <div
                className="animatedModal bg-secondary h-1/2 w-full sm:w-1/2 lg:w-1/3 my-2 md:my-0 rounded-md 
                            flex flex-col items-center justify-center gap-8"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  onClick={() => setOpenNotLoggedModal(false)}
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
                <Logo />
                <div>
                  <h1 className="text-detail text-2xl font-extrabold text-center">
                    Você precisa estar logado para fazer isso!
                  </h1>
                  <p className="text-letter text-lg text-center">
                    Aproveite também para criar suas próprias artes!
                  </p>
                </div>
                <Link
                  href="/api/auth/login"
                  className="bg-detail text-center hover:scale-105 text-xs xs:text-sm md:text-xl w-1/2 font-bold text-primary p-3 rounded-md"
                >
                  Entrar
                </Link>
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
                  {renderUserTag(true)}
                </Link>
              ) : (
                <h4>{renderUserTag()}</h4>
              )}
            </div>

            <div className="h-1/2 w-full sm:h-[512px] sm:w-[512px] hover:opacity-70 hover:cursor-pointer relative">
              <span className="text-letter text-xs sm:text-sm font-light absolute -top-6 right-0">
                {new Date(generation.createdAt).toLocaleDateString('pt-BR')}
              </span>
              <Image
                src={generation.imageUrl}
                alt={`Tatuagem gerada por inteligência artifical com o prompt: ${generation.prompt}`}
                priority
                className="rounded-md"
                onClick={() => setOpenFullscreenImageModal(true)}
                fill
                placeholder="blur"
                blurDataURL="/images/blur-image.jpg"
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>

            <div className="w-full sm:w-[512px] flex items-center justify-between mb-6">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                onClick={handleShare}
                viewBox="0 0 24 24"
                className={`h-8 w-8 text-letter cursor-pointer`}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    onClick={handleToggleBookmark}
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    className={`h-8 w-8 text-letter ${
                      isBookmarked
                        ? 'fill-detail text-yellow-400 hover:fill-yellow-600 hover:text-yellow-600'
                        : 'hover:fill-detail hover:text-detail'
                    } hover:cursor-pointer`}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                  <p className="font-bold text-md sm:text-xl">
                    {bookmarkCount}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    onClick={handleToggleLike}
                    className={`h-8 w-8 text-letter ${
                      isLiked
                        ? 'fill-red-600 text-red-600 hover:fill-red-800 hover:text-red-800'
                        : 'hover:fill-red-600 hover:text-red-600'
                    } hover:cursor-pointer`}
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

                  <p className="font-bold text-md sm:text-xl">{likeCount}</p>
                </div>
              </div>
            </div>
            <Link
              href="/criar"
              className="mb-3 md:mb-6 text-center bg-detail hover:scale-105 text-xs xs:text-sm md:text-xl sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 font-bold text-primary p-3 rounded-md"
            >
              Crie sua própria tatuagem
            </Link>
          </div>
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

  const { query, req, res } = context;
  const session = (await getSession(req, res)) as Session;
  const sessionUser = session?.user ?? {};
  const currentUserId = sessionUser?.sub?.split('|')?.[1] ?? null;

  const generationId = query?.id;

  const generation = await prisma.generation.findFirst({
    where: {
      id: generationId as string,
    },
    select: {
      id: true,
      authorId: true,
      authorName: true,
      createdAt: true,
      prompt: true,
      imageUrl: true,
      style: true,
      bookmarks:
        currentUserId == null ? false : { where: { userId: currentUserId } },
      likes:
        currentUserId == null ? false : { where: { userId: currentUserId } },
      _count: {
        select: {
          likes: true,
          bookmarks: true,
        },
      },
    },
  });

  if (!generation) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  return {
    props: {
      generation: JSON.parse(
        JSON.stringify({
          id: generation.id,
          authorId: generation.authorId,
          authorName: generation.authorName,
          createdAt: generation.createdAt,
          prompt: generation.prompt,
          imageUrl: generation.imageUrl,
          style: generation.style,
          isLiked: generation.likes?.length > 0,
          isBookmarked: generation.bookmarks?.length > 0,
          likeCount: generation._count.likes ?? 0,
          bookmarkCount: generation._count.bookmarks ?? 0,
        })
      ),
    },
  };
};

export default Tattoo;
