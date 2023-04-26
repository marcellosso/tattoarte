import Link from 'next/link';
import Logo from '../logo';
import NavbarLink from './navbar-link';

const MainNavbar = () => {
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
          <Link
            href="/criar"
            className="bg-gradient-to-r font-bold text-primary text-sm p-2 rounded-md bg-detail hover:bg-yellow-500"
          >
            Crie sua arte
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
