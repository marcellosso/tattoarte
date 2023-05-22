import { Oswald } from 'next/font/google';
import Link from 'next/link';
import { FC } from 'react';
import Logo from './logo';

const oswald = Oswald({ subsets: ['latin'] });

interface IMarketingModal {
  setOpenMarketingModal: (_o: boolean) => void;
}

const MarketingModal: FC<IMarketingModal> = ({ setOpenMarketingModal }) => {
  return (
    <div
      className="fixed top-0 left-0 bg-[#393e46a4] w-screen h-screen z-40 flex items-center justify-center"
      onClick={() => setOpenMarketingModal(false)}
    >
      <div
        className="bg-secondary w-11/12 h-96 md:w-1/2 md:h-2/5 lg:w-1/3 rounded-md p-4 flex flex-col items-center justify-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute w-6 h-6 right-2 top-2 hover:cursor-pointer"
          onClick={() => setOpenMarketingModal(false)}
        >
          <svg
            fill="none"
            className="text-detail hover:text-yellow-200 transition-all"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <Logo />

        <h1 className="text-letter font-bold text-lg md:text-2xl mt-2 md:mt-3">
          Crie tatuagens do seu jeito
        </h1>
        <h2 className="text-letter font-thin text-xs md:text-sm mb-3">
          Obtenha acesso a criações com um único pagamento.
        </h2>

        <div className="bg-yellow-50 w-full md:w-4/5 h-16 rounded-lg border-yellow-400 border-2 my-4 p-2">
          <div className="flex h-full items-center">
            <div className="w-6 h-6">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="text-yellow-600"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="ml-2 md:ml-4">
              <h3 className="text-yellow-600 font-bold text-sm md:text-md">
                Seus créditos esgotaram!
              </h3>
              <span className="text-yellow-600 text-2xs md:text-xs line-clamp-2">
                Compra créditos para criar suas artes novamente.
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/precos?tab=package"
          className={`${oswald.className} bg-gradient-to-r w-3/4 md:w-1/2 font-bold text-center text-md md:text-lg text-letter transition-all p-2 md:p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500`}
        >
          Compre créditos!
        </Link>

        <p className="text-letter text-xs md:text-sm font-semibold mt-4">
          <span className="text-detail font-bold">Pagamento único</span>, você
          não será cobrado novamente.
        </p>
      </div>
    </div>
  );
};

export default MarketingModal;
