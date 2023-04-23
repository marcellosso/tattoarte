import Link from 'next/link';
import MainNavbar from '@/components/navbars/main-navbar';
import products from '@/assets/products';
import PriceCard from '@/components/price-card';
import { GetServerSidePropsContext } from 'next';
import { FC, useMemo, useState } from 'react';
import { PriceTabEnum } from '@/types';

interface IPrice {
  defaultPriceTab: PriceTabEnum;
}

const Price: FC<IPrice> = ({ defaultPriceTab }) => {
  const [priceTab, setPriceTab] = useState(defaultPriceTab);
  console.log(priceTab);

  const displayProducts = useMemo(() => products[priceTab], [priceTab]);

  return (
    <>
      <MainNavbar />
      <main className="flex min-h-screen h-screen flex-col items-center pt-8 pb-0 from-secondary to-primary bg-gradient-to-b text-letter">
        <section className="overflow-scroll scrollbar-hide">
          <div className="py-8 px-4 mx-auto max-w-screen-xl max-h-full lg:pt-12 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-8">
              <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-detail">
                Cria ou ache um design perfeito para suas tatuagens
              </h2>
              <p className="mb-10 font-light text-letter sm:text-md">
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
                className="font-bold text-primary p-3 rounded-md bg-detail hover:bg-yellow-500"
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

            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 ">
              {displayProducts.map((product) => (
                <PriceCard product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
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
