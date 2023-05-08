import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../logo';
import UserAvatar from '../user-avatar';
import NavbarLink from './navbar-link';

const Navbar = () => {
  const { user } = useUser();
  const { route } = useRouter();

  return (
    <nav className="bg-navbar fixed w-full z-20 top-0 left-0 max-h-12 p-2 py-1">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <Logo />

        <div className="flex gap-5 items-center">
          <ul className="flex p-0 font-medium gap-5 mt-0">
            <NavbarLink
              label="Descobrir"
              href="/descobrir"
              isSelected={route == '/descobrir'}
            />
            <NavbarLink
              label="Estilos"
              href="/estilos"
              isSelected={route == '/estilos'}
            />
            <NavbarLink
              label="Preços"
              href="/precos"
              isSelected={route == '/precos'}
            />
          </ul>
          <Link
            href="/criar"
            className="
              border border-detail text-letter text-sm p-2 rounded-md bg-transparent transition-all duration-300
              hover:bg-detail hover:text-primary hover:font-bold
            "
          >
            Crie sua arte
          </Link>
          {user && (
            <UserAvatar
              userName={user.name ?? ''}
              userPicture={user.picture ?? ''}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
