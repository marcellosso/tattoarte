import Link from 'next/link';
import products from '@/assets/products';
import PriceCard from '@/components/price-card';
import { GetServerSidePropsContext } from 'next';
import { FC, useMemo, useState } from 'react';
import { PriceTabEnum } from '@/types';
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
      <section className="flex min-h-screen h-screen flex-col items-center pt-6 md:pt-8 pb-0 text-letter overflow-y-scroll overflow-x-hidden scrollbar-hide">
        <div className="py-8 px-4 mx-auto max-w-screen-xl max-h-full lg:pt-12 lg:px-6 flex flex-col items-center">
          <div className="mx-auto max-w-screen-lg text-center mb-4 lg:mb-8">
            <h1 className="mb-4 text-md sm:text-2xl md:text-4xl tracking-tight font-bold text-letter text-center">
              Cria um design <span className="text-detail">perfeito</span> para
              suas tatuagens
            </h1>
            <h2 className="mb-10 font-light text-letter text-xs sm:text-lg">
              Nossa IA artista de tatuagens é capaz de gerar designs
              personalizados ilimitados em segundos, baseado em seu gosto
              pessoal e suas ideias. Você pode criar designs para tatuagens de{' '}
              <span className="text-detail font-bold">animais</span>,{' '}
              <span className="text-detail font-bold">flores</span>,{' '}
              <span className="text-detail font-bold">símbolos</span> e, até
              mesmo, designs{' '}
              <span className="text-detail font-bold">complexos</span>,
              utilizando diversos elementos e{' '}
              <span className="text-detail font-bold">inspirações</span>.
            </h2>
            <Link
              href="/criar"
              className="font-bold text-[0.55rem] xs:text-xs sm:text-sm md:text-lg text-primary px-5 xs:px-10 py-2 xs:py-3 rounded-md bg-detail hover:bg-yellow-500"
            >
              4 tatuagens gratuitas - Crie sua arte agora
            </Link>
          </div>

          <div className="flex w-full items-center justify-between mb-4">
            <h3 className="font-medium text-sm sm:text-md md:text-3xl">
              Escolha a melhor opção para você
            </h3>
            <div className="bg-detail h-0.5 w-1/3 sm:w-1/2" />
          </div>

          <div className="flex items-center justify-center mb-4 rounded-3xl bg-secondary p-1 w-48">
            <div
              className={`py-2 px-4 text-center rounded-3xl text-md sm:text-lg transition-all duration-300  ${
                priceTab == PriceTabEnum.ACCESS
                  ? 'bg-detail text-primary font-bold'
                  : 'hover:cursor-pointer'
              }`}
              onClick={() => setPriceTab(PriceTabEnum.ACCESS)}
            >
              Avulso
            </div>
            <div
              className={`py-2 px-4 text-center rounded-3xl text-md sm:text-lg transition-all duration-300 ${
                priceTab == PriceTabEnum.PACKAGE
                  ? 'bg-detail text-primary font-bold'
                  : 'hover:cursor-pointer'
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
      </section>
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
