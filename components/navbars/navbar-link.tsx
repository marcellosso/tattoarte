import Link from 'next/link';
import { FC } from 'react';

interface INavbarLink {
  label: string;
  href: string;
  icon?: JSX.Element;
}

const NavbarLink: FC<INavbarLink> = ({ label, href, icon }) => (
  <li>
    <Link
      href={href}
      className="flex py-2 pl-3 pr-4 text-letter rounded hover:bg-detail md:hover:bg-transparent md:hover:text-detail md:p-0hover:bg-gray-700"
      aria-current="page"
    >
      {icon && icon}
      {label}
    </Link>
  </li>
);

export default NavbarLink;