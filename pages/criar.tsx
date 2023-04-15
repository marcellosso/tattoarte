import tattooStyles from '@/assets/tattoo-styles';
import AppNavbar from '@/components/app-navbar';
import ImageContainer from '@/components/image-container';
import generateImage from '@/utils/generate';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { PrismaClient, User } from '@prisma/client';
import { Oswald } from 'next/font/google';
import Link from 'next/link';
import React, { FC } from 'react';

import { SketchPicker } from 'react-color';

const oswald = Oswald({ subsets: ['latin'] });

interface IAPP {
  user: UserProfile & User;
}

const App: FC<IAPP> = ({ user }) => {
  const [color, setColor] = React.useState('#fff');
  const [openColorPicker, setOpenColorPicker] = React.useState(false);
  const [params, setParams] = React.useState<ParamsType>({} as ParamsType);

  const [loadingImages, setLoadingImages] = React.useState(false);

  return (
    <>
      <AppNavbar user={user} />
      <main className="flex min-h-screen h-screen flex-col items-center justify-between pt-16 bg-primary text-letter">
        <section className="flex w-screen h-full">
          <div className="bg-secondary w-1/5 h-full shadow-lg shadow-gray-500">
            <h1 className="text-lg font-bold text-letter border-b-2 text-center divide-letter py-2">
              Crie suas <span className="text-detail">tattoos</span>,{' '}
              {user.name}!
            </h1>

            <div className="p-4">
              <div className="mb-3">
                <label
                  htmlFor="prompt"
                  className="block mb-2 text-sm font-medium text-letter"
                >
                  Descreva sua tattoo
                </label>
                <textarea
                  id="prompt"
                  value={params.prompt}
                  onChange={(e) =>
                    setParams({ ...params, prompt: e.target.value })
                  }
                  rows={4}
                  className="max-w-full max-h-64 h-32 block p-2.5 w-full text-sm rounded-lg bg-primary border border-gray-600 placeholder-gray-400 text-letter focus:border-letter"
                  placeholder="Um pescador viajando pelo espaço"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="cores"
                  className="block mb-2 text-sm font-medium text-letter"
                >
                  Cores
                </label>
                <select
                  value={params.colorsStyle}
                  onChange={(e) =>
                    setParams({ ...params, colorsStyle: e.target.value })
                  }
                  id="countries"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-primary border-gray-600 placeholder-gray-400 text-letter focus:border-letter"
                >
                  <option value="Preto e Branco">Preto e Branco</option>
                  <option value="Colorido">Colorido</option>
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="estilo"
                  className="block mb-2 text-sm font-medium text-letter"
                >
                  Estilo
                </label>
                <select
                  value={params.tattooStyle}
                  onChange={(e) =>
                    setParams({ ...params, tattooStyle: e.target.value })
                  }
                  id="estilo"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-primary border-gray-600 placeholder-gray-400 text-letter focus:border-letter"
                >
                  {tattooStyles.map((tattoo, idx) => (
                    <option key={idx} value={tattoo} className="py-4">
                      {tattoo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-letter"
                >
                  Artistas para inspiração
                </label>
                <input
                  value={params.artistInspiration}
                  onChange={(e) =>
                    setParams({ ...params, artistInspiration: e.target.value })
                  }
                  type="text"
                  id="first_name"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-primary border-gray-600 placeholder-gray-400 text-letter focus:border-letter"
                  placeholder="Tarsila do Amaral, Cândido Portinari, Romero Britto"
                  required
                />
              </div>

              <div className="mb-3 flex items-center">
                <div
                  className="w-10 h-10 hover:cursor-pointer mr-2 rounded-sm"
                  style={{ backgroundColor: color }}
                  onClick={() => setOpenColorPicker(!openColorPicker)}
                />
                {openColorPicker && (
                  <div className="absolute z-10">
                    <div
                      className="fixed top-0 left-0 bottom-0 right-0"
                      onClick={() => setOpenColorPicker(false)}
                    />
                    <SketchPicker
                      color={color}
                      onChangeComplete={(color) => setColor(color.hex)}
                      className="mt-2 text-primary"
                    />
                  </div>
                )}
                <div
                  className="w-10 h-10 hover:cursor-pointer mr-2 rounded-sm"
                  style={{ backgroundColor: '#e5e5e' }}
                />
                <div className="w-10 h-10 hover:cursor-pointer mr-2 rounded-sm bg-gray-600 border-gray-400 border">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="mb-3">
                <label className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={params.isHD || false}
                    onChange={(_) =>
                      setParams({
                        ...params,
                        isHD: !params.isHD,
                      })
                    }
                  />
                  <div className="w-11 h-6 cursor-pointer peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-gray-600 rounded-full peer dark:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-detail"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Arte em HD{' '}
                    <span className="text-gray-400 text-xs">(+2 credits)</span>
                  </span>
                </label>
              </div>

              <div className="mb-3">
                <label className="relative inline-flex items-center ">
                  <input
                    type="checkbox"
                    checked={params.isPrivate}
                    onChange={(_) =>
                      setParams({
                        ...params,
                        isHD: !params.isPrivate,
                      })
                    }
                    className="sr-only peer"
                    disabled={!user.subscribed}
                  />
                  <div className="w-11 h-6 cursor-pointer peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-gray-600 rounded-full peer dark:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-detail"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Arte Privada{' '}
                    <span className="text-gray-400 text-xs">
                      (Apenas com{' '}
                      <Link href="#">
                        <span className="text-detail">Acesso Total</span>
                      </Link>
                      )
                    </span>
                  </span>
                </label>
              </div>

              {user.credits! > 0 || user.subscribed ? (
                <button
                  type="button"
                  onClick={() => generateImage()}
                  className="flex items-center justify-center text-xl bg-gradient-to-r w-full font-bold text-primary p-3 rounded-md bg-detail hover:scale-105"
                >
                  <div className="w-6 h-6 mr-2">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                      />
                    </svg>
                  </div>
                  Criar tattoo
                </button>
              ) : (
                <button
                  // onClick={() =>
                  //   // processPayments('price_1MwG5IICcQQfNZPtAjiwGx5J')
                  // }
                  // onClick={() => processPayments('price_1MwZayICcQQfNZPt9tOeKZNp')}
                  type="button"
                  className={`${oswald.className} bg-gradient-to-r  w-full font-bold text-lg text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500`}
                >
                  Compre o passe de acesso
                </button>
              )}
            </div>
          </div>
          <div className="w-4/5 p-4 bg-primary">
            <div className="bg-secondary h-full w-full rounded-lg shadow-xl drop-shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full items-center justify-items-center overflow-y-scroll scrollbar-hide">
                <ImageContainer isLoading={loadingImages} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession(req, res);
    const sessionUser = session!.user || {};

    const prisma = new PrismaClient();
    const user = (await prisma.user.findUnique({
      where: {
        email: sessionUser.email as string,
      },
    })) as User;

    return {
      props: {
        user: {
          ...sessionUser,
          credits: user?.credits,
          subscribed: user?.subscribed,
          subscriptionAt: user?.subscriptionAt,
          subscriptionDuration: user?.subscriptionDuration,
        },
      },
    };
  },
});

export default App;
