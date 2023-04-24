import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Logo from '../logo';
import NavbarLink from './navbar-link';

const MainNavbar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-navbar fixed w-full z-20 top-0 left-0 shadow-lg max-h-12 p-2 py-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Logo />

        <div className="items-center justify-between flex w-auto">
          <ul className="flex p-0 font-medium md:space-x-8 mt-0">
            <NavbarLink
              label="Descobrir"
              href="/descobrir"
              icon={
                <div className="h-6 w-6 mr-2 hidden md:block">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                </div>
              }
            />
            <NavbarLink
              label="Estilos"
              href="/estilos"
              icon={
                <div className="h-6 w-6 mr-2 hidden md:block">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              }
            />
            <NavbarLink
              label="Preços"
              href="/precos"
              icon={
                <div className="h-6 w-6 mr-2 hidden md:block">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              }
            />
          </ul>
        </div>
        <div className="items-center hidden md:flex">
          {user ? (
            <>
              <Link
                href="/criar"
                className="bg-gradient-to-r font-bold text-primary text-sm p-2 rounded-md bg-detail hover:bg-yellow-500"
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
              Login com Google
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
