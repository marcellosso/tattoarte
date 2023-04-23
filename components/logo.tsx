import Image from "next/legacy/image";
import Link from 'next/link';
import { Oswald } from 'next/font/google';

const oswald = Oswald({ subsets: ['latin'] });

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center">
      <Image
        src="/images/tattooarte-logo.png"
        alt="TattoArte logo - Robo e maquina de tatuagem desenhados a mao. Gere tatuagens usando IA"
        width={40}
        height={40}
        priority
      />
      <span
        className={`${oswald.className} self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-2`}
      >
        Tattoo<span className="font-bold text-detail">Arte</span>
      </span>
    </Link>
  );
};

export default Logo;
