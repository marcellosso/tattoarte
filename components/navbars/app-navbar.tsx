import { User } from '@prisma/client';
import { Oswald } from 'next/font/google';
import Link from 'next/link';
import { FC } from 'react';
import Logo from '../logo';
import UserAvatar from '../user-avatar';
import NavbarLink from './navbar-link';

const oswald = Oswald({ subsets: ['latin'] });

interface IAppNavbar {
  user: User;
}

const AppNavbar: FC<IAppNavbar> = ({ user }) => {
  return (
    <nav className="bg-navbar fixed w-full z-20 top-0 left-0 shadow-lg max-h-12 p-2 py-1">
      <div className="max-w-screen-xl flex md:flex-wrap items-center justify-between mx-auto">
        <Logo />
        <ul className="flex md:p-0 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0">
          <NavbarLink
            label="Colecao"
            href="/colecao"
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
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
            }
          />
          <NavbarLink
            label="Criar"
            href="/criar"
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
                    d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
            }
          />
        </ul>
        <div className="flex items-center">
          {!user.subscribed && (
            <Link
              href="/precos?tab=package"
              className={`${oswald.className} bg-gradient-to-r font-bold text-letter text-sm p-2 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500 hidden md:block`}
            >
              Compre o passe de acesso
            </Link>
          )}

          <UserAvatar />
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
