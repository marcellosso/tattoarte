import Image from 'next/image';
import Link from 'next/link';
import NavbarLink from './navbars/navbar-link';

const Footer = () => {
  return (
    <footer className="bg-secondary w-full h-12 relative bottom-0 left-0 hidden lg:block">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-full">
        <Image
          src="/images/tattooarte-logo.png"
          alt="TattooArtIA logo - Robo e maquina de tatuagem desenhados a mao. Gere tatuagens usando IA"
          width={40}
          height={40}
          priority
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />

        <div className="items-center justify-between flex w-auto ">
          <ul className="flex p-0 font-medium md:space-x-8 mt-0">
            <NavbarLink label="Descobrir" href="/descobrir" />
            <NavbarLink label="Estilos" href="/estilos" />
            <NavbarLink label="Preços" href="/precos" />
          </ul>
        </div>
        <div className="hidden md:flex items-center">
          <>
            <Link
              href="/criar"
              className="font-bold text-primary text-sm p-2 rounded-md bg-detail hover:bg-yellow-500"
            >
              Crie sua arte
            </Link>
          </>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
