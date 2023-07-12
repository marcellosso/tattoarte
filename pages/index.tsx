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

      <section className="bg-primary flex min-h-screen h-screen flex-col items-center pt-12 md:pt-24 pb-0 text-letter overflow-y-scroll scrollbar-hide relative">
        <div className="fixed bottom-0 w-screen h-8 md:h-6 bg-detail flex items-center justify-center p-2 z-100">
          <span className="text-primary text-2xs md:text-xs font-bold text-center">
            Devido a alta demanda, desativamos o teste gratuíto. Perdão pelo
            inconveniente.
          </span>
        </div>
        <header className="lg:min-h-screen lg:min-w-screen relative">
          <div className="flex my-12 lg:my-0 gap-24 p-3 lg:p-6 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6 lg:gap-12 w-full lg:w-1/2 z-20 relative">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-letter text-2xl xs:text-4xl lg:text-5xl xl:text-6xl">
                  CRIE TAUTAGENS
                </h1>
                <div className="h-1 w-1/4 bg-detail" />
                <h1 className="text-letter text-2xl xs:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="text-detail">ÚNICAS</span> COM{' '}
                  <span className="text-detail">IA</span>
                </h1>
                <div className="h-1 w-2/3 bg-detail" />
              </div>

              <div className="flex flex-col w-full lg:w-2/3 items-center gap-2">
                <h2 className="font-bold text-sm xs:text-lg text-center">
                  Chega de tatuagens genéricas, crie uma tatuagem única em
                  segundos de acordo com seu gosto. Escolhe entre diversos
                  estilos para criar a sua próxima tatuagem!
                </h2>
                <div className="h-0.5 w-1/6 bg-detail" />
              </div>

              <div className="flex flex-col w-full lg:w-2/3 items-center gap-2">
                <h3 className="font-medium text-sm xs:text-lg text-center">
                  Crie sua arte agora e junte-se a outros usuários!
                </h3>
                <h3 className="font-extrabold text-detail text-sm xs:text-lg md:text-2xl text-center">
                  Apenas R$ 0,40 por arte de tatuagem
                </h3>
              </div>

              <div className="flex flex-col w-full lg:w-1/2 relative gap-2 items-center">
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
                  href="/precos"
                  className={`bg-gradient-to-r w-2/3 font-bold text-letter text-sm md:text-lg p-2 text-center rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500`}
                >
                  Compre créditos
                </Link>
                <Link
                  href="/criar"
                  className="font-bold text-primary text-center text-xs sm:text-sm md:text-lg p-3 rounded-md bg-detail hover:bg-yellow-500"
                  // className="bg-detail w-2/3 font-bold text-primary text-sm md:text-lg p-2 text-center rounded-md hover:bg-yellow-500"
                >
                  + de 600 Tatuagens criadas, crie a sua arte agora
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/3 h-auto absolute lg:relative z-10">
              <Image
                src={`/images/main-bg-big.png`}
                alt="Uma máquina de um tablet com o TattooArtIA na página de criação de tatuagens"
                priority
                quality={100}
                fill
                className="staticImg opacity-10 lg:opacity-50"
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
            className="hidden lg:block h-16 w-16 mx-auto animate-pulse absolute left-1/2 bottom-24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </header>
        <section className="bg-primary min-h-screen min-w-screen h-screen w-screen ">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full grid-rows-2 md:grid-rows-none">
            <div className="flex flex-col gap-5 p-6 h-full">
              <div className="flex h-1/2 gap-5">
                <div className="w-1/2 relative">
                  <Image
                    fill
                    className="rounded-md"
                    priority
                    quality={100}
                    src="/images/tattoo-example-1.webp"
                    alt="Tatuagem criada por nossa Inteligência Artificial - 'Um pescador de ilusoes' no estilo Aquarela. Arte representa um homem barbudo com um olho azul piscina e outro azul escuro, com elementos de madeira ao redor, o fundo existe a cor azul esfumado"
                  />
                  <div className="bg-primary opacity-100 h-5 w-24 lg:h-10 lg:w-26 p-2 flex items-center justify-center lg:rounded-lg absolute top-0 lg:top-1 left-0 lg:left-1">
                    <span className="text-detail text-xs lg:text-sm">
                      Aquarela
                    </span>
                  </div>
                  <div className="bg-secondary opacity-100 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0 rounded-b-md">
                    <span className="text-2xs sm:text-sm lg:text-md overflow-ellipsis overflow-hidden">
                      Um pescador de ilusoes
                    </span>
                  </div>
                </div>

                <div className="w-1/2 relative">
                  <Image
                    fill
                    className="rounded-md"
                    priority
                    quality={100}
                    src="/images/tattoo-example-2.webp"
                    alt="Tatuagem criada por nossa Inteligência Artificial - 'Uma caveira com rosas' no estilo Minimalista. Arte representa uma caveira com rosas ao seu redor."
                  />
                  <div className="bg-primary opacity-100 h-5 w-24 lg:h-10 lg:w-26 p-2 flex items-center justify-center lg:rounded-xl absolute top-0 lg:top-1 left-0 lg:left-1">
                    <span className="text-detail text-xs lg:text-sm">
                      Minimalista
                    </span>
                  </div>
                  <div className="bg-secondary opacity-100 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0 rounded-b-md">
                    <span className="text-2xs sm:text-sm lg:text-md overflow-ellipsis overflow-hidden">
                      Uma caveira com rosas
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-1/2 gap-5">
                <div className="w-1/2 relative">
                  <Image
                    fill
                    className="rounded-md"
                    priority
                    quality={100}
                    src="/images/tattoo-example-3.webp"
                    alt="Tatuagem criada por nossa Inteligência Artificial - 'Coelho fofo com flores ao redor' no estilo Realista. Arte representa a face de um coelho realista com flores ao seu redor."
                  />
                  <div className="bg-primary opacity-100 h-5 w-24 lg:h-10 lg:w-26 p-2 flex items-center justify-center lg:rounded-lg absolute top-0 lg:top-1 left-0 lg:left-1">
                    <span className="text-detail text-xs lg:text-sm">
                      Realista
                    </span>
                  </div>
                  <div className="bg-secondary opacity-100 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0 rounded-b-md">
                    <span className="text-2xs sm:text-sm lg:text-md overflow-ellipsis overflow-hidden">
                      Coelho fofo com flores ao redor
                    </span>
                  </div>
                </div>

                <div className="w-1/2 relative">
                  <Image
                    fill
                    className="rounded-md"
                    priority
                    quality={100}
                    src="/images/tattoo-example-4.webp"
                    alt="Tatuagem criada por nossa Inteligência Artificial - 'Rosas ao redor de um dragao' no estilo New School. Arte representa um dragao com rosas ao seu redor."
                  />
                  <div className="bg-primary opacity-100 h-5 w-24 lg:h-10 lg:w-26 p-2 flex items-center justify-center lg:rounded-xl absolute top-0 lg:top-1 left-0 lg:left-1">
                    <span className="text-detail text-xs lg:text-sm">
                      New School
                    </span>
                  </div>
                  <div className="bg-secondary opacity-100 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0 rounded-b-md">
                    <span className="text-2xs sm:text-sm lg:text-md overflow-ellipsis overflow-hidden">
                      Rosas ao redor de um dragao
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-3/4 w-full flex flex-col justify-center items-center gap-8 p-8">
              <p className="text-sm md:text-lg text-center">
                Caso possua uma ideia para uma{' '}
                <span className="text-detail font-bold">TATUAGEM</span>, mas
                tenha dificuldades em encontrar o desenho adequado, nossa
                tecnologia de{' '}
                <span className="text-detail font-bold">
                  INTELIGÊNCIA ARTIFICIAL
                </span>{' '}
                pode ajudá-lo a gerar uma em poucos segundos.
              </p>
              <div>
                <p className="text-sm md:text-lg text-center">
                  Com base no que você gosta, você poderá criar um design{' '}
                  <span className="text-detail font-bold">
                    ÚNICO E PERFEITO
                  </span>{' '}
                  e ainda terá à disposição uma infinidade de opções.
                </p>
                <div className="bg-detail h-px w-1/12 relative left-1/2 -translate-x-1/2" />
              </div>

              <Link
                href="/criar"
                className="font-bold text-primary text-center text-xs sm:text-sm md:text-lg p-3 px-6 rounded-md bg-detail hover:bg-yellow-500"
              >
                Crie sua arte agora
              </Link>
            </div>
          </div>
          <h4 className="text-detail font-extrabold text-xl sm:text-2xl lg:text-4xl text-center mt-4">
            É MUITO FÁCIL
          </h4>
          <h5 className="text-letter font-medium text-lg sm:text-xl lg:text-2xl text-center mt-4">
            Crie sua tatuagem do sonhos em segundos
          </h5>
        </section>

        <div className="h-full lg:w-1/2 w-full z-30 mt-24 md:mt-36 rounded-md mb-6 p-4 lg:p0">
          <video
            autoPlay
            muted
            loop
            controls
            className="max-w-full max-h-full w-full h-full border border-detail shadow-md shadow-gray-50 rounded-md object-fill"
          >
            <source src="/videos/demo-video.mp4" />
          </video>
        </div>
      </section>
    </main>
  );
};

export default Home;
