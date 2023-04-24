import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import MainNavbar from '@/components/navbars/main-navbar';
import Footer from '@/components/footer';

const Home = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center h-screen w-screen justify-center">
        <Image
          src={`/images/tattooarte-logo.png`}
          alt="Logo TattooArte. Robo representando IA e uma maquina de tatuagem."
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

  return (
    <main>
      <MainNavbar />
      <section className="flex min-h-screen h-screen flex-col items-center pt-8 pb-0 from-secondary to-gray-800 bg-gradient-to-b text-letter">
        <section>
          <div className="py-8 px-4 mx-auto max-w-screen-xl max-h-full lg:pt-12 lg:px-6 mt-6 mb-2">
            <div className="mx-auto max-w-screen-md text-center">
              <h1 className="mb-4 text-4xl tracking-tight font-bold text-letter">
                CRIE TATUAGENS{' '}
                <span className="text-detail font-extrabold">ÚNICAS</span> COM{' '}
                <span className="text-detail font-extrabold">IA</span>
              </h1>
              <p className="mb-4 font-normal text-letter sm:text-md">
                Caso possua uma ideia para uma{' '}
                <span className="text-detail font-bold uppercase">
                  tatuagem
                </span>
                , mas esteja tendo dificuldades em encontrar o desenho adequado,
                nossa tecnologia de{' '}
                <span className="text-detail font-bold uppercase">
                  inteligência artificial
                </span>{' '}
                pode ajudá-lo a gerar um em poucos segundos. Com base no que
                você gosta, você poderá criar um design{' '}
                <span className="text-detail font-bold uppercase">
                  único e perfeito
                </span>
                , ainda terá à disposição uma infinidade de opções para que
                todos possam encontrar algo que lhes agrade.
              </p>
              <div className="flex flex-col w-full max-w-screen-sm items-center justify-center mx-auto gap-4">
                <div className="relative w-full">
                  <div className="absolute -left-2 flex items-center gap-2 top-1">
                    <span className="text-xs text-letter font-light">
                      Oferta por tempo limitado
                    </span>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="text-letter w-4 h-4"
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
                {user ? (
                  <Link
                    href="/criar"
                    className="font-bold text-primary p-3 rounded-md bg-detail hover:bg-yellow-500"
                  >
                    3 créditos gratuítos - Crie sua arte agora
                  </Link>
                ) : (
                  <Link
                    href="/api/auth/login"
                    className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
                  >
                    <svg
                      className="w-4 h-4 mr-2 -ml-1"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Login com Google
                  </Link>
                )}
              </div>
              {!user && (
                <p className="mt-6">
                  <span className="font-bold text-detail">
                    3 créditos gratuítos
                  </span>{' '}
                  para começar a criar suas artes!
                </p>
              )}
            </div>
          </div>
        </section>
        <section className="h-full w-full relative flex items-center justify-center">
          <div className="h-full w-full flex items-center justify-center px-12">
            <div className="h-full w-1/4 flex items-center justify-center">
              <div className="w-72 h-72 z-30 md:-mt-10 relative rounded-md shadow-lg">
                <Image
                  fill
                  className="rounded-md"
                  style={{
                    objectFit: 'contain',
                  }}
                  priority
                  src="/images/tattoo-example-1.webp"
                  alt="Tatuagem criada por nossa Inteligencia Artificial - 'Um pescador de ilusoes' no estilo Aquarela. Arte representa um homem barbudo com um olho azul piscina e outro azul escuro, com elementos de madeira ao redor, o fundo existe a cor azul esfumado"
                />
                <div className="bg-primary opacity-100 h-10 w-26 p-2 flex items-center justify-center rounded-xl absolute top-1 left-1">
                  <span className="text-detail">Aquarela</span>
                </div>
                <div className="bg-secondary opacity-100 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0">
                  <span className="text-xs overflow-ellipsis overflow-hidden">
                    Um pescador de ilusoes
                  </span>
                </div>
              </div>
            </div>
            <div className="h-full w-1/2 z-30 md:-mt-10 rounded-md shadow-md shadow-gray-50">
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
              <div className="w-72 h-72 z-30 md:-mt-10 relative rounded-md shadow-lg">
                <Image
                  fill
                  className="rounded-md"
                  style={{
                    objectFit: 'contain',
                  }}
                  priority
                  src="/images/tattoo-example-2.webp"
                  alt="Tatuagem criada por nossa Inteligencia Artificial - 'Uma caveira com rosas' no estilo Minimalista. Arte representa uma caveira colorida com elementos psicodelicos em sua facee flores ao redor da cabeca, fundo cinza."
                />
                <div className="bg-primary opacity-100 h-10 w-26 p-2 flex items-center justify-center rounded-xl absolute top-1 left-1">
                  <span className="text-detail">Minimalista</span>
                </div>
                <div className="bg-secondary opacity-100 h-10 w-full p-2 flex items-center justify-center absolute bottom-0 left-0">
                  <span className="text-xs overflow-ellipsis overflow-hidden">
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
