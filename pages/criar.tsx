import tattooStyles from '@/assets/tattoo-styles';
import ImageContainer from '@/components/image-container';
import generateImage from '@/utils/generate';
import { prisma } from '@/utils/use-prisma';
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { Features, User } from '@prisma/client';
import { Oswald } from 'next/font/google';
import Image from 'next/image';
import React, { FC, useMemo, useState } from 'react';

import { toast } from 'react-toastify';
import Link from 'next/link';
import MarketingModal from '@/components/marketing-modal';
import type { ParamsType } from '@/types';

import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { Tooltip } from 'react-tooltip';
import { GetServerSideProps } from 'next';

const oswald = Oswald({ subsets: ['latin'] });

interface IAchievmentModal {
  selectedCoin: string;
  setSelectedCoin: (_c: null) => void;
}

const AchievmentModal: FC<IAchievmentModal> = ({
  selectedCoin,
  setSelectedCoin,
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

  return (
    <div
      className="inset-0 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
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
            Nova moeda desbloqueada!
          </h1>
          <h2 className="text-letter text-xl font-extrabold text-center">
            {coinName}
          </h2>
          <p className="text-letter text-lg text-center">
            Você criou {coinObjective} tatuagens!
          </p>
        </div>
      </div>
    </div>
  );
};

interface ICriar {
  user: User;
}

const Criar: FC<ICriar> = ({ user }) => {
  const { register, handleSubmit, watch, setValue } = useForm<ParamsType>({
    defaultValues: { aiVersion: 'prime' },
  });
  const [userData, setUserData] = useState(user);
  const [achievedCoin, setAchievedCoin] = useState<string | null>(null);

  const [openMarketingModal, setOpenMarketingModal] = useState(
    !user?.subscribed && (user?.credits || 0) <= 0
  );

  const [images, setImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const [toggleForm, setToggleForm] = useState(true);

  const [generationProgress, setGenerationProgress] = useState<number>(0);

  const promptVal = (watch('prompt') || '') as string;
  const aiVersionVal = (watch('aiVersion') || '') as ParamsType['aiVersion'];

  const triggerAchievement = (genCount: number) => {
    if (genCount == 1) {
      setAchievedCoin('bronze-coin');
    } else if (genCount == 5) {
      setAchievedCoin('silver-coin');
    } else if (genCount == 10) {
      setAchievedCoin('gold-coin');
    } else if (genCount == 50) {
      setAchievedCoin('platinum-coin');
    } else if (genCount == 100) {
      setAchievedCoin('diamond-coin');
    }
  };

  const handleCreate = async (params: ParamsType) => {
    setLoadingImages(true);
    setToggleForm(false);

    try {
      const response = await generateImage(
        params,
        userData,
        setGenerationProgress
      );

      const newUserData = response.newUserData;
      setImages(response.images);
      setUserData(newUserData);
      triggerAchievement(newUserData.generationCount);
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
    return 1000;
  }, []);

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
          {achievedCoin && (
            <AchievmentModal
              selectedCoin={achievedCoin}
              setSelectedCoin={setAchievedCoin}
            />
          )}
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
                  {(userData?.generationCount || 0) * 4} tatuagens!
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
                    max-w-full max-h-48 lg:max-h-64 h-16 md:h-28 lg:h-36 
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
                    id="cores"
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

                <div className="w-full mb-3">
                  <Tooltip
                    id="ai-version-help-tooltip"
                    offset={20}
                    className="bg-secondary opacity-100 z-100 overflow-hidden"
                  >
                    <div>
                      <b>Escolha uma versão perfeita para seu resultado!</b>
                    </div>
                  </Tooltip>
                  <label
                    htmlFor="cores"
                    className="flex text-xs md:text-sm font-normal text-letter items-center gap-1"
                  >
                    Versão TattooArtIA
                    <a
                      data-tooltip-id="ai-version-help-tooltip"
                      className="hover:cursor-pointe"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                        />
                      </svg>
                    </a>
                    <p className="uppercase bg-detail rounded-3xl text-primary text-xs px-2">
                      Novo
                    </p>
                  </label>
                  {aiVersionVal == 'classic' ? (
                    <p className="text-gray-400 text-2xs">
                      <b>Classic: </b>Versão mais simples, podendo tomar
                      liberdades artísticas.
                    </p>
                  ) : (
                    <p className="text-gray-400 text-2xs">
                      <b>Prime: </b>Versão mais avançada, tenta seguir sua
                      descrição à risca.
                    </p>
                  )}
                  <div className="flex w-full gap-3 mt-2 relative">
                    <button
                      type="button"
                      className={`border w-1/2  bg-transparent text-xs xs:text-sm p-1 xs:p-2 rounded-md transition-all duration-150
                        ${
                          aiVersionVal == 'classic'
                            ? 'border-detail text-detail'
                            : 'border-letter text-letter hover:border-detail hover:text-detail'
                        }
                      `}
                      onClick={() => setValue('aiVersion', 'classic')}
                    >
                      Classic
                    </button>
                    <button
                      type="button"
                      className={`border w-1/2  bg-transparent text-xs xs:text-sm p-1 xs:p-2 rounded-md transition-all duration-150
                        ${
                          aiVersionVal == 'prime'
                            ? 'border-detail text-detail'
                            : 'border-letter text-letter hover:border-detail hover:text-detail'
                        }
                      `}
                      onClick={() => setValue('aiVersion', 'prime')}
                    >
                      Prime
                    </button>
                    <p className="absolute -right-3 -top-1 text-letter rotate-45 text-xs font-bold">
                      Novo
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="inspiracao"
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
                    id="inspiracao"
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
                    href="/precos"
                    className={`${oswald.className} text-center block bg-gradient-to-r w-full font-bold text-xl text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500`}
                  >
                    Compre créditos para criar tattoos
                  </Link>
                )}
              </form>
              <p className="text-sm font-light self-start">
                Tempo Estimado: {aiVersionVal == 'classic' ? '15' : '20'}{' '}
                segundos
              </p>
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
                        unoptimized
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
                  <ImageContainer
                    isLoading={loadingImages}
                    images={images}
                    progressAmount={generationProgress}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {user.freeTrial && (
          <div className="w-screen h-12 md:h-9 bg-detail flex items-center justify-center p-2">
            <span className="text-primary text-2xs md:text-xs font-bold">
              Devido a alta demanda, desativamos o teste gratuíto. Compre
              créditos para criar tatuagens
            </span>
            <Link
              href="/precos"
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { userId } = await getAuth(req);

  if (!userId) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const userInfo = await clerkClient.users.getUser(userId);

  const user = (await prisma.user.findUnique({
    where: {
      id: userInfo.externalId ?? '',
    },
    select: {
      id: true,
      email: true,
      freeTrial: true,
      credits: true,
      name: true,
      generationCount: true,
    },
  })) as Partial<User & { features: Features }>;

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default Criar;
