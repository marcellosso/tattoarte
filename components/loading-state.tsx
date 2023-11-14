import Image from 'next/image';
import { FC } from 'react';

interface ILoadingState {
  isLoading: boolean;
  label?: string;
}

const LoadingState: FC<ILoadingState> = ({ isLoading, label }) => {
  if (isLoading) {
    return (
      <div className="absolute z-30 top-0 left-0 h-screen w-screen bg-primary opacity-80 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Image
            unoptimized
            src={`/images/tattooarte-logo.png`}
            alt="Logo TattooArtIA. Robo representando IA e uma maquina de tatuagem."
            width={100}
            height={100}
            priority
            quality={100}
            className=" ml-1 animate-bounce"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          <span className="text-letter text-sm font-extrabold">{label}</span>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default LoadingState;
