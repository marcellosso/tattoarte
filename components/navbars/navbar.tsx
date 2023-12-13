import { getAuth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import Logo from '../logo';
import UserAvatar from '../user-avatar';
import NavbarLink from './navbar-link';
import { useUser } from '@clerk/nextjs';

const HAMBURGER_LINE = `block h-1 w-8 my-1 bg-detail transition ease-linear transform duration-300`;

interface IMobileNavbarLink {
  label: string;
  linkRoute: string;
  isSelected: boolean;
  onClick: () => void;
}

const MobileNavbarLink: FC<IMobileNavbarLink> = ({
  label,
  linkRoute,
  isSelected,
  onClick,
}) => (
  <Link
    href={linkRoute}
    className={`
      px-4 py-2 flex items-center
       before:bg-detail  before:absolute before:w-1 before:transition-all before:duration-300 before:-ml-2
      ${isSelected ? 'before:h-1/2' : 'before:h-0'}
    `}
    onClick={onClick}
  >
    {label}
  </Link>
);

interface IMobileNavbar {
  currentRoute: string;
  toggleMobileNavbar: boolean;
  setToggleMobileNavbar: (_v: boolean) => void;
}

const MobileNavbar: FC<IMobileNavbar> = ({
  currentRoute,
  toggleMobileNavbar,
  setToggleMobileNavbar,
}) => (
  <div
    id="userDropdown"
    className={`z-100 top-12 right-2 absolute rounded-bl-md bg-primary transition ease-linear transform duration-300 ${
      toggleMobileNavbar ? 'block' : 'hidden'
    }`}
  >
    <ul className="pb-2 pt-1 text-sm text-letter" aria-labelledby="userAvatar">
      <li className="relative mb-2">
        <MobileNavbarLink
          label="Descobrir"
          linkRoute="/descobrir"
          isSelected={currentRoute.includes('/descobrir')}
          onClick={() => setToggleMobileNavbar(false)}
        />
      </li>

      <li className="relative mb-2">
        <MobileNavbarLink
          label="Estilos"
          linkRoute="/estilos"
          isSelected={currentRoute.includes('/estilos')}
          onClick={() => setToggleMobileNavbar(false)}
        />
      </li>

      <li className="relative mb-2">
        <MobileNavbarLink
          label="Preços"
          linkRoute="/precos"
          isSelected={currentRoute.includes('/precos')}
          onClick={() => setToggleMobileNavbar(false)}
        />
      </li>
    </ul>
  </div>
);

const Navbar = () => {
  const { user } = useUser();
  const { route } = useRouter();

  const [toggleMobileNavbar, setToggleMobileNavbar] = useState(false);

  return (
    <nav className="bg-navbar fixed w-full z-100 top-0 left-0 max-h-12 p-2 py-1">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <Logo />

        <div className="flex gap-5 items-center">
          <ul className="hidden lg:flex p-0 font-medium gap-5 mt-0">
            <NavbarLink
              label="Descobrir"
              href="/descobrir"
              isSelected={route.includes('/descobrir')}
            />
            <NavbarLink
              label="Estilos"
              href="/estilos"
              isSelected={route.includes('/estilos')}
            />
            <NavbarLink
              label="Preços"
              href="/precos"
              isSelected={route.includes('/precos')}
            />
          </ul>
          <Link
            href="/criar"
            className="
            text-letter text-xs xs:text-sm
              border border-detail p-1 xs:p-2 rounded-md bg-transparent transition-all duration-300
              hover:bg-detail hover:text-primary hover:font-bold
            "
          >
            Crie sua arte
          </Link>
          {user && <UserAvatar userName={user.fullName ?? ''} />}
          {toggleMobileNavbar && (
            <div
              className="fixed top-0 left-0 bottom-0 right-0 bg-primary z-20 opacity-40"
              onClick={() => setToggleMobileNavbar(false)}
            />
          )}
          <div
            className="block lg:hidden space-y-2 z-100"
            onClick={() => setToggleMobileNavbar((prev) => !prev)}
          >
            <span
              className={`${HAMBURGER_LINE} ${
                toggleMobileNavbar ? 'rotate-45 translate-y-3' : ''
              }`}
            ></span>
            <span
              className={`${HAMBURGER_LINE} ${
                toggleMobileNavbar ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`${HAMBURGER_LINE} ${
                toggleMobileNavbar ? '-rotate-45 -translate-y-3 ' : ''
              }`}
            ></span>
          </div>

          <MobileNavbar
            toggleMobileNavbar={toggleMobileNavbar}
            setToggleMobileNavbar={setToggleMobileNavbar}
            currentRoute={route}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
