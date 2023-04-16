import Link from 'next/link';
import { FC } from 'react';

interface INavbarLink {
  label: string;
  href: string;
}

const NavbarLink: FC<INavbarLink> = ({ label, href }) => (
  <li>
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-letter rounded hover:bg-detail md:hover:bg-transparent md:hover:text-detail md:p-0hover:bg-gray-700"
      aria-current="page"
    >
      {label}
    </Link>
  </li>
);

export default NavbarLink;
