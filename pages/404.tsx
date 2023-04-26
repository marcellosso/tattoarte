import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Image
        src={`/images/tattooarte-logo.png`}
        alt="Logo TattooArte. Robo representando IA e uma maquina de tatuagem."
        width={100}
        height={100}
        priority
        quality={100}
        className=" ml-1"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <h1 className="text-detail font-extrabold text-4xl">404</h1>
      <h2 className="text-letter font-normal text-2xl">
        Parece que você está perdido
      </h2>
      <Link
        href="/"
        className="p-2 bg-detail text-primary font-bold rounded-md mt-4"
      >
        Volte para o começo
      </Link>
    </div>
  );
}
