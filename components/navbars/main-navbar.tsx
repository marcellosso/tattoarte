import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import Link from 'next/link';
import NavbarLink from './navbar-link';

const MainNavbar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-secondary fixed w-full z-20 top-0 left-0 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/tattooarte-logo.png"
            alt="TattoArte logo - Robo e maquina de tatuagem desenhados a mao. Gere tatuagens usando IA"
            width={40}
            height={40}
            priority
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Tattoo<span className="font-bold text-detail">Arte</span>
          </span>
        </Link>
        <div className="flex md:order-2">
          {user ? (
            <>
              <Link
                href="/criar"
                className="bg-gradient-to-r font-bold text-primary p-3 rounded-md bg-detail hover:bg-yellow-500"
              >
                Crie sua arte
              </Link>
            </>
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
              Sign in with Google
            </Link>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border bg-secondary rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <NavbarLink label="Descobrir" href="/descobrir" />
            <NavbarLink label="Estilos" href="/estilos" />
            <NavbarLink label="Preços" href="/" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
