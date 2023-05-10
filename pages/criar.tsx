import tattooStyles from '@/assets/tattoo-styles';
import ImageContainer from '@/components/image-container';
import generateImage from '@/utils/generate';
import { prisma } from '@/utils/use-prisma';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { User } from '@prisma/client';
import { Oswald } from 'next/font/google';
import Image from 'next/image';
import React, { FC, useMemo, useRef, useState } from 'react';

import { toast } from 'react-toastify';
import handleUserSubscription from '@/utils/user-subscription';
import Link from 'next/link';
import MarketingModal from '@/components/marketing-modal';
import type { ParamsType } from '@/types';

import { useForm } from 'react-hook-form';
import Head from 'next/head';

const oswald = Oswald({ subsets: ['latin'] });
interface IAPP {
  user: UserProfile & User;
}

const App: FC<IAPP> = ({ user }) => {
  const { register, handleSubmit, watch } = useForm<ParamsType>();
  const [userData, setUserData] = useState(user);

  const [openMarketingModal, setOpenMarketingModal] = useState(
    !user?.subscribed && (user?.credits || 0) <= 0
  );

  const [images, setImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const [toggleForm, setToggleForm] = useState(true);

  const handleCreate = async (params: ParamsType) => {
    setLoadingImages(true);
    setToggleForm(false);

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
  const promptVal = watch('prompt') || '';

  const maxPromptLenght = useMemo(() => {
    if (user?.freeTrial) return 100;
    if (!user?.subscribed) return 250;

    return 500;
  }, [user]);

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

      {openMarketingModal && (
        <MarketingModal setOpenMarketingModal={setOpenMarketingModal} />
      )}

      <section className="flex min-h-screen h-screen flex-col items-center justify-between pt-12 text-letter">
        <div className="flex flex-col lg:flex-row w-screen h-full">
          <div
            className={`bg-primary w-full ${
              toggleForm ? 'max-lg:h-fit' : 'h-20 md:h-40'
            } lg:w-1/5 lg:h-full  overflow-y-scroll scrollbar-hide max-md:flex max-md:justify-between max-md:flex-col`}
          >
            <div className="flex flex-col items-center justify-center">
              <h1
                className={`
              ${toggleForm ? 'max-md:block' : 'max-md:hidden'}
              text-xs md:text-md font-bold text-letter text-center divide-letter md:py-2 px-0
              `}
              >
                Crie suas <span className="text-detail">tattoos</span>,{' '}
                {user?.name}!
              </h1>
              <span
                className={`
              ${toggleForm ? 'max-md:block' : 'max-md:hidden'}
              text-gray-400 text-2xs md:text-xs text-center pb-1 md:pb-3
              `}
              >
                Voce já criou
                <span className="text-detail">
                  {' '}
                  {(userData.generationCount || 0) * 4} tatuagens!
                </span>
              </span>
              <Link
                href="/precos"
                className={`${
                  toggleForm ? 'max-md:text-sm' : 'max-md:text-lg'
                } text-detail text-center font-black pb-1 md:pb-3`}
              >
                <span className="text-letter font-medium">Créditos:</span>{' '}
                {userData.credits}
              </Link>
              <div
                className={`${
                  toggleForm ? 'max-md:block' : 'max-md:hidden'
                } h-px w-1/2 bg-detail`}
              />
            </div>

            <div
              className={`p-2 lg:p-4 ${
                toggleForm ? 'max-md:flex' : 'max-md:hidden'
              } max-md:flex-col max-md:gap-4 max-md:items-center max-md:justify-center max-md:w-full`}
            >
              {promptVal.length >= maxPromptLenght && !user.subscribed && (
                <div
                  className="flex p-4 mb-4 text-sm border rounded-lg  text-blue-400 border-blue-800"
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
              <form
                onSubmit={handleSubmit(handleCreate)}
                className={`${
                  toggleForm ? 'block' : 'max-lg:hidden'
                } max-md:w-full`}
              >
                <div className="mb-3 relative focus:border-detail">
                  <label
                    htmlFor="prompt"
                    className="block mb-2 text-xs md:text-sm font-normal text-letter"
                  >
                    Descreva sua tattoo
                  </label>
                  {promptVal.length > maxPromptLenght - 15 && (
                    <div className="text-xs text-gray-400 text-right absolute right-2 bottom-2">
                      {promptVal.length} / {maxPromptLenght}
                    </div>
                  )}
                  <textarea
                    id="prompt"
                    {...register('prompt', { maxLength: maxPromptLenght })}
                    rows={4}
                    maxLength={maxPromptLenght}
                    className=" bg-primary
                    placeholder-shown:text-2xs md:placeholder-shown:text-md 
                    max-w-full max-h-48 lg:max-h-64 h-20 md:h-32 lg:h-48 
                    block p-2.5 w-full text-sm rounded-lg 
                    border border-letter placeholder-gray-400 text-letter focus:border-detail focus:outline-none"
                    placeholder="Um pescador viajando pelo espaço"
                  />
                </div>

                <div className="w-full mb-3">
                  <label
                    htmlFor="cores"
                    className="block mb-2 text-xs md:text-sm font-normal text-letter"
                  >
                    Cores
                  </label>
                  <select
                    {...register('colorsStyle')}
                    id="countries"
                    className="border text-xs md:text-sm rounded-lg block w-full p-2 md:p-2.5 bg-primary 
                    border-letter placeholder-gray-400 text-letter focus:border-detail"
                  >
                    <option value="Colorful">Colorido</option>
                    <option value="Black and White">Preto e Branco</option>
                  </select>
                </div>

                <div className="w-full mb-3">
                  <label
                    htmlFor="estilo"
                    className="block mb-2 text-xs md:text-sm font-normal text-letter"
                  >
                    Estilo
                  </label>
                  <select
                    {...register('tattooStyle')}
                    id="estilo"
                    className="border bg-primary text-xs md:text-sm rounded-lg block w-full p-2 md:p-2.5  border-letter placeholder-gray-400 text-letter focus:border-detail"
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
                    className="block mb-2 text-xs md:text-sm font-normal text-letter"
                  >
                    Artistas para inspiração{' '}
                    <span className="text-gray-400 text-2xs md:text-xs">
                      (Opcional)
                    </span>
                  </label>
                  <input
                    {...register('artistInspiration')}
                    type="text"
                    id="first_name"
                    className="border bg-primary text-xs md:text-sm rounded-lg block w-full p-2 md:p-2.5 
                    placeholder:text-2xs border-letter placeholder-gray-400 text-letter focus:border-detail focus:outline-none"
                    placeholder="Tarsila do Amaral, Cândido Portinari, Romero Britto"
                  />
                </div>

                <div className="mb-3">
                  <label className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      {...register('isPrivate')}
                      className="sr-only peer"
                      disabled={user?.freeTrial ?? true}
                    />
                    <div
                      className={`w-11 h-6 ${
                        user?.freeTrial
                          ? 'cursor-not-allowed border-gray-500'
                          : 'cursor-pointer border-letter'
                      } border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-600 rounded-full peer peer-checked:after:translate-x-full 
                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                      after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-detail`}
                    ></div>
                    <span
                      className={`ml-3 text-xs md:text-sm font-medium ${
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

                {(userData.credits || 0) > 0 || userData.subscribed ? (
                  <button
                    type="submit"
                    disabled={loadingImages}
                    className={`flex items-center justify-center text-sm md:text-xl bg-gradient-to-r w-full font-bold text-primary p-2 md:p-3 rounded-md ${
                      loadingImages
                        ? 'bg-gray-400'
                        : 'bg-detail hover:scale-105'
                    }`}
                  >
                    <div className="w-4 h-4 md:w-6 md:h-6 mr-2">
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
              </form>
              <div className="flex justify-center w-full">
                <Image
                  src={`/images/tattoo-machine.png`}
                  alt="Uma máquina de tatuagem, demonstrando o que poderia ser usado pela IA do TattooArtIA!"
                  width={200}
                  height={120}
                  priority
                  quality={100}
                  className={`${
                    toggleForm ? 'hidden md:block' : 'max-lg:hidden'
                  } rotate-12 mt-3 opacity-50 mr-2`}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setToggleForm(!toggleForm)}
              className="lg:hidden flex items-center justify-center text-xl bg-gradient-to-r w-full font-bold p-2  text-letter hover:scale-105"
            >
              {toggleForm ? (
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`w-full ${
              toggleForm ? 'max-md:hidden max-lg:h-2/6' : 'h-5/6'
            } lg:h-full lg:w-4/5 p-4 `}
          >
            <div className="bg-secondary h-full w-full rounded-lg shadow-xl drop-shadow-2xl p-3">
              {images?.length == 0 && !loadingImages ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="h-5/6 lg:w-3/7 lg:h-3/4 max-w-xl bg-white flex flex-col items-center justify-center lg:justify-between p-4 rounded-xl shadow-xl">
                    <h2 className="text-primary font-bold text-2xl">
                      Suas tatuagens irão aparecer aqui!
                    </h2>
                    <p className="text-primary text-sm text-center">
                      Preencha os campos na sua esquerda, clique em{' '}
                      <span className="text-secondary font-bold">
                        Criar tattoo
                      </span>{' '}
                      e, com isso, nossa IA criará uma tatuagem{' '}
                      <span className="text-secondary font-bold">única</span>{' '}
                      para você!
                    </p>
                    <div
                      className={`h-full w-full relative ${
                        toggleForm ? 'hidden' : 'block'
                      } lg:block`}
                    >
                      <Image
                        src="/images/tattoo-background.webp"
                        alt="Imagem de fundo com diversas 'flash' tattoos."
                        priority
                        fill
                        sizes="100vw"
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full overflow-y-scroll scrollbar-hide gap-5 place-items-center">
                  <ImageContainer isLoading={loadingImages} images={images} />
                </div>
              )}
            </div>
          </div>
        </div>
        {user.freeTrial && (
          <div className="w-screen h-12 md:h-9 bg-detail flex items-center justify-center p-2">
            <span className="text-primary text-2xs md:text-xs font-bold">
              Seu teste permite gerar 4 tatuagens. Compre o passe de acesso para
              criar tatuagens ilimitadas
            </span>
            <Link
              href="/precos?tab=package"
              className={`ml-3 h-full text-center flex items-center bg-primary font-bold text-[0.55rem] md:text-xs text-letter p-3 px-4 rounded-md hover:bg-secondary`}
            >
              Comprar
            </Link>
          </div>
        )}
      </section>
    </main>
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
