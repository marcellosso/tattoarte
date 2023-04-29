import Image from 'next/image';
import Link from 'next/link';
import MainNavbar from '@/components/navbars/main-navbar';
import Footer from '@/components/footer';
import Head from 'next/head';

const Home = () => {
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
          content={`${process.env.SITE_URL}images/og-tattooart.jpg`}
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
          content={`${process.env.SITE_URL}images/og-tattooart.jpg`}
        />
        <meta
          property="og:image:alt"
          content="Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA"
        />
      </Head>
      <MainNavbar />
      <section className="flex min-h-screen h-screen flex-col items-center pt-4 md:pt-8 pb-0 from-secondary to-gray-800 bg-gradient-to-b text-letter overflow-y-scroll scrollbar-hide">
        <section>
          <div className="py-8 px-4 mx-auto max-w-screen-xl max-h-full lg:pt-12 lg:px-6 mt-6 mb-2">
            <div className="mx-auto max-w-screen-md text-center">
              <h1 className="mb-4 text-xl sm:text-2xñ md:text-4xl tracking-tight font-bold text-letter">
                CRIE TATUAGENS{' '}
                <span className="text-detail font-extrabold">ÚNICAS</span> COM{' '}
                <span className="text-detail font-extrabold">IA</span>
              </h1>
              <p className="mb-4 font-normal text-letter text-xs sm:text-sm md:text-md">
                Caso possua uma ideia para uma{' '}
                <span className="text-detail font-bold uppercase">
                  tatuagem
                </span>
                , mas esteja tendo dificuldades em encontrar o desenho adequado,
                nossa tecnologia de{' '}
                <span className="text-detail font-bold uppercase">
                  inteligência artificial
                </span>{' '}
                pode ajudá-lo a gerar uma em poucos segundos. Com base no que
                você gosta, você poderá criar um design{' '}
                <span className="text-detail font-bold uppercase">
                  único e perfeito
                </span>
                e ainda terá à disposição uma infinidade de opções para que
                todos possam encontrar algo que lhes agrade.
              </p>
              <div className="flex flex-col w-full max-w-screen-sm items-center justify-center mx-auto gap-4">
                <div className="relative w-full mt-5 md:mt-0">
                  <div className="absolute -left-2 flex items-center gap-2 -top-6 md:top-1">
                    <span className="text-xs text-letter font-light">
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
                </div>
                <Link
                  href="/criar"
                  className="font-bold text-primary text-xs sm:text-sm md:text-md p-3 rounded-md bg-detail hover:bg-yellow-500"
                >
                  12 tatuagens gratuítas - Crie sua arte agora
                </Link>
              </div>
              <p className="mt-6">
                <span className="font-bold text-detail">
                  3 créditos gratuitos
                </span>{' '}
                para começar a criar suas artes!
              </p>
            </div>
          </div>
        </section>
        <section className="h-full w-full relative flex items-center justify-center">
          <div className="h-full w-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 lg:px-12 mb-4 lg:mb-2">
            <div className="h-full w-full lg:w-1/4 flex items-center justify-center gap-3 lg:gap-0 mb-2 lg:mb-0">
              <div className="w-1/2 h-48 md:h-64 lg:w-72 lg:h-72 z-30 lg:-mt-10 relative rounded-md shadow-lg">
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
            </div>
            <div className="h-full lg:w-1/2 w-full z-30 mt-0 lg:-mt-10 rounded-md shadow-md shadow-gray-50">
              <video
                autoPlay
                muted
                loop
                controls
                className="max-w-full max-h-full w-full h-full border border-detail shadow-lg rounded-md object-fill"
              >
                <source src="/videos/demo.mp4" />
              </video>
            </div>
            <div className="h-full w-1/4 flex items-center justify-center">
              <div className="w-72 h-72 z-30 lg:-mt-10 relative rounded-md shadow-lg hidden lg:block">
                <Image
                  fill
                  className="rounded-md"
                  style={{
                    objectFit: 'contain',
                  }}
                  priority
                  src="/images/tattoo-example-2.webp"
                  alt="Tatuagem criada por nossa Inteligência Artificial - 'Uma caveira com rosas' no estilo Minimalista. Arte representa uma caveira colorida com elementos psicodelicos em sua facee flores ao redor da cabeça, fundo cinza."
                />
                <div className="bg-primary opacity-100 h-10 w-26 p-2 flex items-center justify-center rounded-xl absolute top-1 left-1">
                  <span className="text-detail">Minimalista</span>
                </div>
                <div className="bg-secondary opacity-100 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0">
                  <span className="text-2xs sm:text-sm lg:text-md overflow-ellipsis overflow-hidden">
                    Uma caveira com rosas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
