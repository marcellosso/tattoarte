import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center logo">
      <Image
        src="/images/tattooarte-logo.png"
        alt="TattooArtIA logo - Robo e maquina de tatuagem desenhados a mao. Gere tatuagens usando IA"
        width={35}
        height={35}
        priority
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <span className="self-center text-2xl font-bold whitespace-nowrap text-letter ml-2 hidden md:block">
        TattooArt<span className="font-extrabold text-detail">IA</span>
      </span>
    </Link>
  );
};

export default Logo;
