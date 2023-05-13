import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

const Home = () => {
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
      <section className="flex min-h-screen h-screen flex-col items-center pt-12 md:pt-24 pb-0 text-letter overflow-y-scroll scrollbar-hide">
        <header className="min-h-screen min-w-screen relative">
          <div className="flex gap-24 p-6 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-12 w-1/2">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-letter text-lg sm:text-xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl">
                  CRIE TAUTAGENS
                </h1>
                <div className="h-1 w-1/4 bg-detail" />
                <h1 className="text-letter text-lg sm:text-xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl">
                  <span className="text-detail">ÚNICAS</span> COM{' '}
                  <span className="text-detail">IA</span>
                </h1>
                <div className="h-1 w-2/3 bg-detail" />
              </div>

              <div className="flex flex-col w-2/3 items-center gap-2">
                <h2 className="font-bold text-lg text-center">
                  Chega de tatuagens genéricas, crie uma tatuagem única em
                  segundos de acordo com seu gosto. Escolhe entre diversos
                  estilos para criar a sua próxima tatuagem!
                </h2>
                <div className="h-0.5 w-1/6 bg-detail" />
              </div>

              <div className="flex flex-col w-2/3 items-center gap-2">
                <h3 className="font-bold text-lg text-center">
                  Crie sua arte agora e ganhe{' '}
                  <span className="text-detail">créditos gratuítos</span>
                </h3>
              </div>

              <div className="flex flex-col w-1/2 relative gap-2 items-center">
                <div className="flex gap-2 -ml-6">
                  <span className="text-sm text-letter font-light animate-pulse -mt-2">
                    Oferta por tempo limitado
                  </span>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-letter w-6 h-6"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                    />
                  </svg>
                </div>
                <Link
                  href="/precos?tab=package"
                  className={`bg-gradient-to-r w-2/3 font-bold text-letter text-sm md:text-lg p-2 text-center rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500`}
                >
                  Compre o passe de acesso
                </Link>
                <Link
                  href="/criar"
                  className="font-bold text-primary text-center text-xs sm:text-sm md:text-lg p-3 rounded-md bg-detail hover:bg-yellow-500"
                >
                  4 tatuagens gratuitas - Crie sua arte agora
                </Link>
              </div>

              {/* <div className="relative w-full mt-5 md:mt-0">
                <div className="absolute -left-2 flex items-center gap-2 -top-6 md:top-1">
                  <span className="text-xs text-letter font-light animate-pulse">
                    Oferta por tempo limitado
                  </span>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-letter w-4 h-4 block md:hidden rotateY"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3"
                    />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="text-letter w-4 h-4 hidden md:block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
                <Link
                  href="/precos?tab=package"
                  className={`bg-gradient-to-r font-bold text-letter text-sm p-2 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500`}
                >
                  Compre o passe de acesso
                </Link>
              </div> */}
            </div>

            <div className="w-1/3 h-auto relative">
              <Image
                src={`/images/main-bg-big.png`}
                alt="Uma máquina de um tablet com o TattooArtIA na página de criação de tatuagens"
                priority
                quality={100}
                fill
                className="staticImg"
                sizes="100vw"
              />
            </div>
          </div>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-16 w-16 mx-auto animate-pulse absolute left-1/2 bottom-24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </header>
        <section className="bg-primary min-h-screen min-w-screen h-screen w-screen"></section>
        {/* <div className="w-1/2 h-48 md:h-64 lg:w-72 lg:h-72 z-30 lg:-mt-10 relative rounded-md shadow-lg">
                <Image
                  fill
                  className="rounded-md object-cover lg:object-contain"
                  priority
                  src="/images/tattoo-example-1.webp"
                  alt="Tatuagem criada por nossa Inteligência Artificial - 'Um pescador de ilusoes' no estilo Aquarela. Arte representa um homem barbudo com um olho azul piscina e outro azul escuro, com elementos de madeira ao redor, o fundo existe a cor azul esfumado"
                />
                <div className="bg-primary opacity-100 h-5 w-24 lg:h-10 lg:w-26 p-2 flex items-center justify-center lg:rounded-lg absolute top-0 lg:top-1 left-0 lg:left-1">
                  <span className="text-detail text-xs lg:text-lg">
                    Aquarela
                  </span>
                </div>
                <div className="bg-secondary opacity-100 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0">
                  <span className="text-2xs sm:text-sm lg:text-md overflow-ellipsis overflow-hidden">
                    Um pescador de ilusoes
                  </span>
                </div>
              </div>
              <div className="w-1/2 h-48 md:h-64 lg:w-72 lg:h-72 z-30 lg:-mt-10 relative rounded-md shadow-lg block lg:hidden">
                <Image
                  fill
                  className="rounded-md object-cover lg:object-contain"
                  priority
                  src="/images/tattoo-example-2.webp"
                  alt="Tatuagem criada por nossa Inteligência Artificial - 'Uma caveira com rosas' no estilo Minimalista. Arte representa uma caveira colorida com elementos psicodelicos em sua facee flores ao redor da cabeça, fundo cinza."
                />
                <div className="bg-primary opacity-100 h-5 w-24 lg:h-10 lg:w-26 p-2 flex items-center justify-center lg:rounded-xl absolute top-0 lg:top-1 left-0 lg:left-1">
                  <span className="text-detail text-xs lg:text-lg">
                    Minimalista
                  </span>
                </div>
                <div className="bg-secondary opacity-100 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0">
                  <span className="text-2xs sm:text-sm lg:text-md overflow-ellipsis overflow-hidden">
                    Uma caveira com rosas
                  </span>
                </div>
              </div>
            </div> */}
        {/* <div className="h-full lg:w-1/2 w-full z-30 mt-0 lg:-mt-10 rounded-md shadow-md shadow-gray-50">
              <video
                autoPlay
                muted
                loop
                controls
                className="max-w-full max-h-full w-full h-full border border-detail shadow-lg rounded-md object-fill"
              >
                <source src="/videos/demo.mp4" />
              </video>
            </div> */}
      </section>
    </main>
  );
};

export default Home;
