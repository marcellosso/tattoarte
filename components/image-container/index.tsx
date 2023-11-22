import Image from 'next/image';
import { FC, useState } from 'react';
import LoadingImage from './loading-image';

interface IImageContaier {
  isLoading: boolean;
  images: string[];
  progressAmount: number;
}

const ImageContainer: FC<IImageContaier> = ({
  isLoading,
  images,
  progressAmount,
}) => {
  const [openFullscreenImageModal, setOpenFullscreenImageModal] = useState('');

  if (isLoading) {
    return (
      <>
        <LoadingImage progressAmount={progressAmount} />
        <LoadingImage progressAmount={progressAmount} />
        <LoadingImage progressAmount={progressAmount} />
        <LoadingImage progressAmount={progressAmount} />
      </>
    );
  }

  return (
    <>
      {openFullscreenImageModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center hover:cursor-pointer"
          onClick={() => setOpenFullscreenImageModal('')}
        >
          <div className="animatedModal w-[1024px] h-5/6 my-2 md:my-0 rounded-md flex items-center justify-center relative">
            <Image
              unoptimized
              src={openFullscreenImageModal}
              alt="Arte de tatuagem criada pela inteligência artificial - TattooArtIA!"
              className="rounded-md"
              fill
              sizes="100vw"
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}
      {images?.map((image) => (
        <div
          key={image}
          className="md:w-[420px] 2xl:w-[640px] w-full h-full min-h-[320px] md:h-96 my-2 md:my-0 rounded-md flex items-center justify-center relative "
        >
          <Image
            unoptimized
            src={image}
            alt="Arte de tatuagem criada pela inteligência artificial - TattooArtIA!"
            className="rounded-md hover:cursor-pointer hover:opacity-60 transition-all duration-200"
            onClick={() => setOpenFullscreenImageModal(image)}
            fill
            placeholder="blur"
            blurDataURL="/images/blur-image.jpg"
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </>
  );
};

export default ImageContainer;
