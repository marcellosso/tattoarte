import Image from 'next/image';
import Link from 'next/link';
import NavbarLink from './navbars/navbar-link';

const Footer = () => {
  return (
    <footer className="bg-secondary w-full h-12 relative bottom-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-full">
        <Image
          src="/images/tattooarte-logo.png"
          alt="TattoArte logo - Robo e maquina de tatuagem desenhados a mao. Gere tatuagens usando IA"
          width={40}
          height={40}
          priority
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <div className="flex md:order-2 items-center">
          <>
            <Link
              href="/criar"
              className="font-bold text-primary text-sm p-2 rounded-md bg-detail hover:bg-yellow-500"
            >
              Crie sua arte
            </Link>
          </>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0  font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <NavbarLink label="Descobrir" href="/descobrir" />
            <NavbarLink label="Estilos" href="/estilos" />
            <NavbarLink label="Preços" href="/precos" />
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
