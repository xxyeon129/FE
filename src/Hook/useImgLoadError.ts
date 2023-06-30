import { useState } from 'react';

const useImgLoadError = () => {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  const onImageError = () => {
    setImageLoadError(true);
  };

  return { imageLoadError, onImageError };
};

export default useImgLoadError;
