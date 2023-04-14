import processPayments from '@/utils/payment';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import React, { FC, useMemo } from 'react';

const AppNavbar = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const userInitials = useMemo(() => {
    const name = user?.name || '';
    const initials = name
      .match(/(^\S\S?|\b\S)?/g)
      ?.join('')
      ?.match(/(^\S|\S$)?/g)
      ?.join('')
      .toUpperCase();

    return initials;
  }, [user?.name]);

  return (
    <nav className="bg-secondary fixed w-full z-20 top-0 left-0 shadow-lg max-h-16">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link href="/" className="flex items-center">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            TattoArte
          </span>
        </Link>
        <div className="flex md:order-2 items-center">
          <button
            onClick={() => processPayments('price_1MwG5IICcQQfNZPtAjiwGx5J')}
            // onClick={() => processPayments('price_1MwZayICcQQfNZPt9tOeKZNp')}
            type="button"
            className="bg-gradient-to-r font-bold text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500 ..."
          >
            Compre o passe de acesso
          </button>
          <button
            data-toggle="collapse"
            data-target="#navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Abra o menu</span>
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
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          <div>
            <div
              id="userAvatar"
              onClick={() => setIsOpen(!isOpen)}
              className="relative inline-flex items-center justify-center ml-3 w-12 h-12 overflow-hidde rounded-full bg-gray-600 hover:bg-gray-700 hover:cursor-pointer"
            >
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {userInitials}
              </span>
            </div>

            <div
              id="userDropdown"
              className={`z-10 divide-y absolute mt-3 rounded-md shadow w-44 dark:bg-gray-700 ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="userAvatar"
              >
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Compras
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sair
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
