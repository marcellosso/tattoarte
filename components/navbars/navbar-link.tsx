import Link from 'next/link';
import { FC } from 'react';

interface INavbarLink {
  label: string;
  href: string;
  isSelected: boolean;
  icon?: JSX.Element;
}

const NavbarLink: FC<INavbarLink> = ({ label, href, icon, isSelected }) => (
  <li className="relative">
    <Link
      href={href}
      className={`
        flex xs:pl-3 text-sm md:text-md pr-2 xs:pr-4 text-letter rounded md:hover:bg-transparent  md:p-0 items-center
        before:bottom-0 before:bg-detail  before:absolute before:h-px before:transition-all before:duration-300
        ${isSelected ? 'before:w-full' : 'before:w-0 hover:before:w-full'}
      `}
      aria-current="page"
    >
      {icon && icon}
      {label}
    </Link>
  </li>
);

export default NavbarLink;
