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
      className="flex xs:pl-3 text-sm md:text-md pr-2 xs:pr-4 text-letter rounded hover:bg-detail md:hover:bg-transparent md:hover:text-detail md:p-0 items-center"
      aria-current="page"
    >
      {icon && icon}
      {label}
    </Link>
  </li>
);

export default NavbarLink;
