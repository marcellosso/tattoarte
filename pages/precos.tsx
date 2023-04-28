import Link from 'next/link';
import MainNavbar from '@/components/navbars/main-navbar';
import products from '@/assets/products';
import PriceCard from '@/components/price-card';
import { GetServerSidePropsContext } from 'next';
import { FC, useMemo, useState } from 'react';
import { PriceTabEnum } from '@/types';
import Footer from '@/components/footer';
import Head from 'next/head';

interface IPrice {
  defaultPriceTab: PriceTabEnum;
}

const Price: FC<IPrice> = ({ defaultPriceTab }) => {
  const [priceTab, setPriceTab] = useState(defaultPriceTab);

  const displayProducts = useMemo(() => products[priceTab], [priceTab]);

  return (
    <main>
      <Head>
        <title>
          Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Crie tatuagens Únicas com IA. Deixe nossa Inteligencia Artificial criar tatuagens Únicas para você em segundos, de forma rápida e fácil. 
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
          content="Crie tatuagens Únicas com IA. Deixe nossa Inteligencia Artificial criar tatuagens Únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
        />
        <meta
          name="twitter:image"
          content="https://6ef9-186-137-149-202.ngrok-free.app/images/og-tattooart.jpg"
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
          content="Crie tatuagens Únicas com IA. Deixe nossa Inteligencia Artificial criar tatuagens Únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
        />
        <meta
          property="og:image"
          content="https://6ef9-186-137-149-202.ngrok-free.app/images/og-tattooart.jpg"
        />
        <meta
          property="og:image:alt"
          content="Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA"
        />
      </Head>
      <MainNavbar />
      <section className="flex min-h-screen h-screen flex-col items-center pt-6 md:pt-8 pb-0 from-secondary to-primary bg-gradient-to-b text-letter">
        <div className="overflow-scroll scrollbar-hide">
          <div className="py-8 px-4 mx-auto max-w-screen-xl max-h-full lg:pt-12 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-8">
              <h1 className="mb-4 text-md sm:text-xl md:text-3xl tracking-tight font-extrabold text-detail text-center">
                Cria ou ache um design perfeito para suas tatuagens
              </h1>
              <p className="mb-10 font-light text-letter text-xs sm:text-md">
                Nossa IA artista de tatuagens é capaz de gerar designs
                personalizados ilimitados para você, em apenas segundos, baseado
                em seu gosto pessoal e suas ideias. Você pode criar designs para
                tatuagens de{' '}
                <span className="text-detail font-bold">animais</span>,{' '}
                <span className="text-detail font-bold">flores</span>,{' '}
                <span className="text-detail font-bold">símbolos</span>, e até
                mesmo, design{' '}
                <span className="text-detail font-bold">complexos</span>,
                utilizando diversos elementos e{' '}
                <span className="text-detail font-bold">inspirações</span>.
              </p>
              <Link
                href="/criar"
                className="font-bold text-[0.55rem] xs:text-xs sm:text-sm md:text-md text-primary p-2 xs:p-3 rounded-md bg-detail hover:bg-yellow-500"
              >
                3 créditos gratuítos - Crie sua arte agora
              </Link>
            </div>

            <div className="flex items-center justify-center mb-4">
              <div
                className={`py-2 px-4 text-center mr-6 shadow border border-transparent hover:cursor-pointer hover:border-detail ${
                  priceTab == PriceTabEnum.ACCESS
                    ? 'bg-blue-700'
                    : 'bg-gray-950 hover:cursor-pointer hover:border-detail'
                }`}
                onClick={() => setPriceTab(PriceTabEnum.ACCESS)}
              >
                Avulso
              </div>
              <div
                className={`py-2 px-4 text-center mr-6 shadow border border-transparent ${
                  priceTab == PriceTabEnum.PACKAGE
                    ? 'bg-blue-700'
                    : 'bg-gray-950 hover:cursor-pointer hover:border-detail'
                }`}
                onClick={() => setPriceTab(PriceTabEnum.PACKAGE)}
              >
                Pacote
              </div>
            </div>

            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
              {displayProducts.map((product) => (
                <PriceCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const { tab } = query;

  return {
    props: {
      defaultPriceTab: tab || PriceTabEnum.ACCESS,
    },
  };
};

export default Price;
