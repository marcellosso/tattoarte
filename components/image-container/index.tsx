import { FC } from 'react';
import LoadingImage from './loading-image';

interface IImageContaier {
  isLoading: boolean;
}

const ImageContainer: FC<IImageContaier> = ({ isLoading }) => {
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

  return <></>;
};

export default ImageContainer;
