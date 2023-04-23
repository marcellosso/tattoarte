import Image from "next/legacy/image";
import { FC, useState } from 'react';
import LoadingImage from './loading-image';

interface IImageContaier {
  isLoading: boolean;
  images: string[];
}

const ImageContainer: FC<IImageContaier> = ({ isLoading, images }) => {
  const [openFullscreenImageModal, setOpenFullscreenImageModal] = useState('');

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
      {openFullscreenImageModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center hover:cursor-pointer"
          onClick={() => setOpenFullscreenImageModal('')}
        >
          <div className="w-[1024px] h-[768px] my-2 md:my-0 rounded-md flex items-center justify-center relative">
            <Image
              src={openFullscreenImageModal}
              alt="Arte de tatuagem criada pela inteligencia artificial - TattooArte!"
              objectFit="contain"
              layout="fill"
              className="rounded-md"
            />
          </div>
        </div>
      )}
      {images?.map((image) => (
        <div className="w-[640px] h-[640px] md:h-96 my-2 md:my-0 rounded-md flex items-center justify-center relative hover:scale-105">
          <Image
            src={image}
            alt="Arte de tatuagem criada pela inteligencia artificial - TattooArte!"
            objectFit="cover"
            layout="fill"
            className="rounded-md hover:cursor-pointer"
            onClick={() => setOpenFullscreenImageModal(image)}
          />
        </div>
      ))}
    </>
  );
};

export default ImageContainer;
