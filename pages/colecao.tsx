import Image from 'next/image';
import Link from 'next/link';
import AppNavbar from '@/components/navbars/app-navbar';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { prisma } from '@/utils/use-prisma';
import { Generation, User } from '@prisma/client';
import { FC, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import useDebounce from '@/utils/hooks/useDebounce';
import { toast } from 'react-toastify';

interface ICollection {
  user: User;
  generations: Generation[];
  ownerName: string;
  isOwner: boolean;
}

const Collection: FC<ICollection> = ({
  user,
  generations,
  ownerName,
  isOwner,
}) => {
  const [localGenerations, setLocalGenerations] =
    useState<Generation[]>(generations);

  const [tabs, setTabs] = useState('all');
  const debouncedLocalGenerations = useDebounce(
    localGenerations,
    1500
  ) as Generation[];

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

  const generationsToShow = useMemo(() => {
    if (tabs === 'all') return localGenerations;
    else return localGenerations.filter((gen) => gen.is_favorite);
  }, [localGenerations, tabs]);

  const updateGenerations = async (updateGenerations: Generation[]) => {
    try {
      await axios.put('/api/generation/update', { updateGenerations });
    } catch (err: any) {
      toast.error(err.message as string, {
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

  return (
    <>
      <AppNavbar user={user} />
      <main className="flex min-h-screen h-screen flex-col items-center p-12 pt-16 bg-primary text-letter overflow-hidden">
        <h1 className="text-3xl font-bold">
          Coleção de <span className="text-detail">{ownerName}</span>
        </h1>

        <div className="bg-secondary h-full w-full mt-4 rounded-md shadow-2xl p-6 relative">
          <div
            className={`absolute -top-8 left-0 p-3 font-bold rounded-ss-lg ${
              tabs == 'all'
                ? 'bg-gray-900 text-detail'
                : 'bg-secondary hover:cursor-pointer hover:bg-gray-800 text-letter'
            }`}
            onClick={() => isOwner && setTabs('all')}
          >
            <span>Todas</span>
          </div>

          {isOwner && (
            <div
              className={`absolute -top-8 left-16 ml-2 p-3 font-bold rounded-se-lg ${
                tabs == 'favorites'
                  ? 'bg-gray-900 text-detail'
                  : 'bg-secondary hover:cursor-pointer hover:bg-gray-800 text-letter'
              }`}
              onClick={() => isOwner && setTabs('favorites')}
            >
              <span>Favoritas</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:md:grid-cols-6 w-full h-full grid-rows-none gap-5 mt-2 overflow-y-scroll scrollbar-hide">
            {generationsToShow.map((generation) => (
              <Link
                key={generation.id}
                href={`/tattoo/${generation.id}`}
                className="h-[256px] w-[256px] rounded-md hover:scale-105 relative group"
              >
                <Image
                  src={generation.imageUrl}
                  alt={`Tatuagem gerada por inteligencia artifical com o prompt: ${generation.prompt}`}
                  objectFit="cover"
                  layout="fill"
                  priority
                  className="rounded-md"
                />
                {generation.is_private && (
                  <div className="h-6 w-6 absolute left-0 top-0 z-10 opacity-100 group-hover:opacity-0 group-hover:top-2 transition-all">
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
                <div className="bg-primary opacity-0 h-10 w-26 p-2 flex items-center justify-center rounded-xl absolute top-2 left-2 group-hover:opacity-100 transition-all overflow-ellipsis">
                  <span className="text-detail">{generation.style}</span>
                </div>
                <div className="bg-primary opacity-0 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0 group-hover:opacity-100 transition-all">
                  <span className="text-xs overflow-ellipsis overflow-hidden">
                    {generation.prompt}
                  </span>
                </div>
                {isOwner && (
                  <>
                    {generation.is_favorite ? (
                      <div className="h-6 w-6 absolute right-0 top-0 z-10 transition-all">
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
                      <div className="h-6 w-6 absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-all z-10 group-hover:top-2">
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
            ))}
          </div>
        </div>
      </main>
    </>
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
    let ownerName = user?.name;

    if (!isSameUser) {
      const owner = (await prisma.user.findUnique({
        where: {
          id: queryId as string,
        },
        select: {
          name: true,
        },
      })) as User;

      ownerName = owner?.name;
    }

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
        ownerName,
        isOwner: isSameUser,
      },
    };
  },
});

export default Collection;
