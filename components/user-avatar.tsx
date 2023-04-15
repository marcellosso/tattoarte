import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import React, { FC, useMemo } from 'react';

interface IUserAvatar {
  credits?: number;
}

const UserAvatar: FC<IUserAvatar> = ({ credits }) => {
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
    <div>
      <div className="flex items-center ml-3">
        {credits && (
          <div className="bg-primary text-letter text-sm font-bold mr-2 p-3 h-full rounded-3xl shadow-inner">
            {credits} Credits
          </div>
        )}
        <div
          id="userAvatar"
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          className="relative inline-flex items-center justify-center w-12 h-12 shadow-inner overflow-hidden rounded-full bg-primary hover:bg-gray-700 hover:cursor-pointer"
        >
          <span className="text-letter font-bold">{userInitials}</span>
        </div>
      </div>

      <div
        id="userDropdown"
        className={`z-10 ml-5 absolute mt-2 rounded-md shadow bg-primary ${
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
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
            >
              <div className="h-6 w-6 mr-2">
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
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              Coleção
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
            >
              <div className="h-6 w-6 mr-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  ></path>
                </svg>
              </div>
              Compras
            </Link>
          </li>
          <li>
            <Link
              href="/api/auth/logout"
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
            >
              <div className="h-6 w-6 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </div>
              Sair
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserAvatar;
