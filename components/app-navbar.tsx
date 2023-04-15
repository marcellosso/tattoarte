import processPayments from '@/utils/payment';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import React, { FC, useMemo } from 'react';

const AppNavbar = () => {
  const { user } = useUser();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);

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

          <div>
            <div
              id="userAvatar"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="relative inline-flex items-center justify-center ml-3 w-12 h-12 overflow-hidde rounded-full bg-gray-600 hover:bg-gray-700 hover:cursor-pointer"
            >
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {userInitials}
              </span>
            </div>

            <div
              id="userDropdown"
              className={`z-10 divide-y absolute mt-3 rounded-md shadow w-44 dark:bg-gray-700 ${
                isUserDropdownOpen ? 'block' : 'hidden'
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
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      ></path>
                    </svg>{' '}
                    Compras
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api/auth/logout"
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
