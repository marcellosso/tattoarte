import tattooStyles from '@/assets/tattoo-styles';
import AppNavbar from '@/components/navbars/app-navbar';
import ImageContainer from '@/components/image-container';
import generateImage from '@/utils/generate';
import { prisma } from '@/utils/use-prisma';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { User } from '@prisma/client';
import { Oswald } from 'next/font/google';
import Image from 'next/image';
import React, { FC, useMemo, useState } from 'react';

import { toast } from 'react-toastify';
import handleUserSubscription from '@/utils/user-subscription';
import Link from 'next/link';
import MarketingModal from '@/components/marketing-modal';
import { ParamsType } from '@/types';

const oswald = Oswald({ subsets: ['latin'] });
interface IAPP {
  user: UserProfile & User;
}

const App: FC<IAPP> = ({ user }) => {
  const [userData, setUserData] = useState(user);

  const [openMarketingModal, setOpenMarketingModal] = useState(
    !user?.subscribed && user?.credits! <= 0
  );

  const [params, setParams] = useState<ParamsType>({
    prompt: '',
    tattooStyle: 'Minimalista',
    colorsStyle: 'Colorful',
  } as ParamsType);

  const [images, setImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const handleCreate = async () => {
    setLoadingImages(true);
    try {
      const response = await generateImage(params, userData);
      setImages(response.images);
      setUserData(response.newUserData);
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
    setLoadingImages(false);
  };

  const maxPromptLenght = useMemo(() => {
    if (user?.freeTrial) return 100;
    if (!user?.subscribed) return 250;

    return 500;
  }, [user]);

  return (
    <>
      <AppNavbar user={userData} />

      {openMarketingModal && (
        <MarketingModal setOpenMarketingModal={setOpenMarketingModal} />
      )}

      <main className="flex min-h-screen h-screen flex-col items-center justify-between pt-12 bg-primary text-letter">
        <section className="flex w-screen h-full">
          <div className="bg-secondary w-1/5 h-full shadow-lg shadow-gray-500">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-md font-bold text-letter text-center divide-letter py-2 px-0">
                Crie suas <span className="text-detail">tattoos</span>,{' '}
                {user?.name}!
              </h1>
              <span className="text-gray-400 text-xs text-center pb-3">
                Voce já criou
                <span className="text-detail">
                  {' '}
                  {(userData.generationCount || 0) * 4} tatuagens!
                </span>
              </span>
              <div className="h-1 w-full bg-letter" />
            </div>

            <div className="p-4">
              {params.prompt.length >= maxPromptLenght && (
                <div
                  className="flex p-4 mb-4 text-sm border rounded-lg bg-primary text-blue-400 border-blue-800"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-4 h-4 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <Link href="/precos" className="text-xs hover:text-blue-600">
                    Você atingiu o limite de caracteres!
                  </Link>
                </div>
              )}

              <div className="mb-3 relative">
                <label
                  htmlFor="prompt"
                  className="block mb-2 text-sm font-medium text-letter"
                >
                  Descreva sua tattoo
                </label>
                {params.prompt.length > maxPromptLenght - 15 && (
                  <div className="text-xs text-gray-400 text-right absolute right-2 bottom-2">
                    {params.prompt.length} / {maxPromptLenght}
                  </div>
                )}
                <textarea
                  id="prompt"
                  value={params.prompt}
                  onChange={(e) =>
                    setParams({ ...params, prompt: e.target.value })
                  }
                  rows={4}
                  maxLength={maxPromptLenght}
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
                  <option value="Colorful">Colorido</option>
                  <option value="Black and White">Preto e Branco</option>
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
                  Artistas para inspiração{' '}
                  <span className="text-gray-400 text-xs">(Opcional)</span>
                </label>
                <input
                  value={params.artistInspiration}
                  onChange={(e) =>
                    setParams({ ...params, artistInspiration: e.target.value })
                  }
                  type="text"
                  id="first_name"
                  className="border text-sm rounded-lg block w-full p-2.5 placeholder:text-2xs bg-primary border-gray-600 placeholder-gray-400 text-letter focus:border-letter"
                  placeholder="Tarsila do Amaral, Cândido Portinari, Romero Britto"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="relative inline-flex items-center ">
                  <input
                    type="checkbox"
                    checked={params.isPrivate || false}
                    onChange={(_) =>
                      setParams({
                        ...params,
                        isPrivate: !params.isPrivate,
                      })
                    }
                    className="sr-only peer"
                    disabled={user?.freeTrial!}
                  />
                  <div
                    className={`w-11 h-6 ${
                      user?.freeTrial ? 'cursor-not-allowed' : 'cursor-pointer'
                    } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-600 rounded-full peer bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-detail`}
                  ></div>
                  <span
                    className={`ml-3 text-sm font-medium ${
                      user?.freeTrial ? 'text-gray-500' : 'text-letter'
                    }`}
                  >
                    Arte Privada{' '}
                    {!user?.subscribed && (
                      <span className="text-gray-400 text-xs">
                        {!user?.freeTrial && '(+2 creditos)'}
                      </span>
                    )}
                  </span>
                </label>
              </div>

              {userData.credits! > 0 || userData.subscribed ? (
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={loadingImages}
                  className={`flex items-center justify-center text-xl bg-gradient-to-r w-full font-bold text-primary p-3 rounded-md ${
                    loadingImages ? 'bg-gray-400' : 'bg-detail hover:scale-105'
                  }`}
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
                <Link
                  href="/precos?tab=package"
                  className={`${oswald.className} text-center block bg-gradient-to-r w-full font-bold text-xl text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500`}
                >
                  Compre o passe de acesso
                </Link>
              )}
            </div>
          </div>
          <div className="w-4/5 p-4 bg-primary">
            <div className="bg-secondary h-full w-full rounded-lg shadow-xl drop-shadow-2xl">
              {images?.length == 0 && !loadingImages ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3/7 h-3/4 max-w-xl bg-white flex flex-col items-center justify-between p-4 rounded-xl shadow-xl">
                    <h2 className="text-primary font-bold text-2xl">
                      Suas tatuagens irão aparecer aqui!
                    </h2>
                    <p className="text-primary text-sm text-center">
                      Preencha os campos na sua esquerda, clique em{' '}
                      <span className="text-secondary font-bold">
                        'Criar tattoo'
                      </span>{' '}
                      e, com isso, nossa IA criará uma tatuagem{' '}
                      <span className="text-secondary font-bold">única</span>{' '}
                      para você!
                    </p>
                    <Image
                      src="/images/tattoo-background.webp"
                      alt="Imagem de fundo com diversas 'flash' tattoos."
                      height={600}
                      width={600}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 h-full w-full items-center justify-items-center overflow-y-scroll scrollbar-hide">
                  <ImageContainer isLoading={loadingImages} images={images} />
                </div>
              )}
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

    let user = (await prisma.user.findUnique({
      where: {
        email: sessionUser.email as string,
      },
    })) as User;

    if (user?.subscribed) {
      user = await handleUserSubscription(user);
    }

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  },
});

export default App;
