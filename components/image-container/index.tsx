import Image from 'next/image';
import { FC } from 'react';
import LoadingImage from './loading-image';

interface IImageContaier {
  isLoading: boolean;
  images: string[];
}

const ImageContainer: FC<IImageContaier> = ({ isLoading, images }) => {
  if (isLoading) {
    return (
      <>
        <LoadingImage />
        <LoadingImage />
        <LoadingImage />
        <LoadingImage />
      </>
    );
  }

  return (
    <>
      {images?.map((image) => (
        <div className="w-11/12 h-72 md:h-96 my-2 md:my-0 rounded-md flex items-center justify-center relative">
          <Image
            src={image}
            alt="Arte criada por TattooArte!"
            objectFit="contain"
            layout="fill"
            className="rounded-md"
          />
        </div>
      ))}
    </>
  );
};

export default ImageContainer;
