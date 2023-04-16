import processPayments from '@/utils/payment';
import { useUser } from '@auth0/nextjs-auth0/client';
import { User } from '@prisma/client';
import { Oswald } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import UserAvatar from '../user-avatar';
import NavbarLink from './navbar-link';

const oswald = Oswald({ subsets: ['latin'] });
// const inter = Inter({ subsets: ['latin'] });

interface IAppNavbar {
  user: User;
}

const AppNavbar: FC<IAppNavbar> = ({ user }) => {
  return (
    <nav className="bg-secondary fixed w-full z-20 top-0 left-0 shadow-lg max-h-16">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/images/tattooarte-logo.png"
            alt="TattoArte logo - Robo e maquina de tatuagem desenhados a mao. Gere tatuagens usando IA"
            width={50}
            height={50}
          />
          <span
            className={`${oswald.className} self-center text-3xl font-semibold whitespace-nowrap dark:text-white ml-2`}
          >
            Tattoo<span className="font-bold text-detail">Arte</span>
          </span>
        </Link>
        {/* <div className=" hidden w-full md:flex md:w-auto md:order-1"> */}
        <ul className="flex p-4 md:p-0 mt-4 font-medium border bg-secondary rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
          <NavbarLink label="Colecao" href="/colecao" />
          <NavbarLink label="Criar" href="/criar" />
        </ul>
        {/* </div> */}
        <div className="flex md:order-2 items-center ">
          {!user.subscribed && (
            <button
              onClick={() => processPayments('price_1MwG5IICcQQfNZPtAjiwGx5J')}
              // onClick={() => processPayments('price_1MwZayICcQQfNZPt9tOeKZNp')}
              type="button"
              className={`${oswald.className} bg-gradient-to-r font-bold text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500`}
            >
              Compre o passe de acesso
            </button>
          )}

          <UserAvatar
            credits={user.credits as number}
            isSubscribed={user.subscribed as boolean}
            userId={user.id}
          />
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
