/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import MainNavbar from '@/components/navbars/main-navbar';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import Image from 'next/image';
import processPayment from '@/utils/payment';
import Logo from '@/components/logo';

type ProductInfo = {
  price: string;
  title: string;
  description: string;
  image: string;
};

interface ICheckout {
  priceId: string;
}

const Checkout: FC<ICheckout> = ({ priceId }) => {
  const [productInfo, setProductInfo] = useState<ProductInfo>(
    {} as ProductInfo
  );

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingCheckoutSession, setLoadingCheckoutSession] = useState(false);

  const localePrice = useMemo(() => {
    return (parseInt(productInfo.price) / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [productInfo.price]);

  const getProductInfo = async () => {
    try {
      const { data } = await axios.get(`/api/product/${priceId}`);

      if (data) setProductInfo(data);

      setLoadingProduct(false);
    } catch (err) {
      toast.error('Não foi possível obter o produto', {
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

  useEffect(() => {
    getProductInfo();
  }, []);

  const onCheckoutClick = async () => {
    setLoadingCheckoutSession(true);
    await processPayment(priceId);
    setLoadingCheckoutSession(false);
  };

  return (
    <main>
      <Head>
        <title>
          Artista de Tatuagem IA - Crie tatuagens com Inteligência Artificial |
          TattooArtIA
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Criar tatuagem com inteligência Artificial. Deixe nossa Inteligência Artificial criar tatuagens únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta
          name="twitter:title"
          content="Artista de Tatuagem IA - Crie tatuagens com Inteligência Artificial | TattooArtIA"
        />
        <meta name="twitter:creator" content="@tattooartia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.tattooartia.com/" />
        <meta property="twitter:domain" content="tattooartia.com" />
        <meta
          name="twitter:description"
          content="Criar tatuagem com inteligência Artificial. Deixe nossa Inteligência Artificial criar tatuagens únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}images/og-tattooart.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content="Artista de Tatuagem IA - Crie tatuagens com Inteligência Artificial | TattooArtIA"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.tattooartia.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Artista de Tatuagem IA - Crie tatuagens com Inteligência Artificial | TattooArtIA"
        />
        <meta
          property="og:description"
          content="Criar tatuagem com inteligência Artificial. Deixe nossa Inteligência Artificial criar tatuagens Únicas para você em segundos, de forma rápida e fácil. 
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
        <meta
          name="google-site-verification"
          content="ffZ_-cy0-_bgVD36C25pYT39CdP6aXu3hhx3FNd-En4"
        />
      </Head>
      <MainNavbar />
      <section className="flex min-h-screen h-screen px-2 flex-col items-center justify-center pt-16 md:pt-24 pb-0 bg-secondary text-letter">
        <h1 className="text-detail text-3xl font-extrabold mb-4">Checkout</h1>
        <div className="bg-primary w-full md:h-2/5 md:w-3/4 lg:h-1/3 lg:w-1/2 rounded-lg p-6 flex flex-col gap-5">
          <div className="w-full h-2/3 rounded-lg">
            <div className="h-full w-full flex gap-3">
              <div
                className={`${
                  loadingProduct && 'bg-gray-400 animate-pulse'
                } h-full w-1/3 md:w-1/6 rounded-md relative`}
              >
                {!loadingProduct && (
                  <Image
                    src={productInfo.image}
                    alt={`Imagem do produto: ${productInfo.title}`}
                    priority
                    className="rounded-md"
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                )}
              </div>
              <div className="flex flex-col h-full w-5/6 gap-2 p-2">
                <div
                  className={`${
                    loadingProduct && 'bg-gray-400 animate-pulse'
                  } w-full md:w-1/2 h-1/3 rounded-md`}
                >
                  {!loadingProduct && (
                    <h2 className="text-detail font-bold md:text-md sm:text-sm text-xs">
                      {productInfo.title}
                    </h2>
                  )}
                </div>
                <div
                  className={`${
                    loadingProduct && 'bg-gray-400 animate-pulse'
                  }  w-full h-2/3 rounded-md`}
                >
                  {!loadingProduct && (
                    <span className="md:text-md sm:text-xs text-xs">
                      {productInfo.description}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              loadingProduct ? 'bg-gray-400 animate-pulse' : 'bg-gray-700'
            } w-full h-1/3 rounded-lg justify-between items-center flex p-2 md:p-4`}
          >
            {!loadingProduct && (
              <>
                <div className="flex items-center gap-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    height={24}
                    width={24}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <p className="text-sm md:text-md">
                    O valor de compra é{' '}
                    <span className="text-detail font-bold">
                      R${localePrice}
                    </span>
                  </p>
                </div>
                {loadingCheckoutSession ? (
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
                ) : (
                  <button
                    onClick={onCheckoutClick}
                    className="bg-gradient-to-r font-bold text-center text-letter p-2 md:p-3 text-sm md:text-md rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500"
                  >
                    Compre agora
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { query } = context;
    const priceId = query.priceId || undefined;

    return {
      props: {
        priceId,
      },
    };
  },
});

export default Checkout;
