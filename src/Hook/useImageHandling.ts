import { useState, ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression';

export const useImageHandling = () => {
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const imageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 0) {
      const fileList = Array.from(e.target.files);
      const isAllFilesValid = fileList.every(file => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return validImageTypes.includes(file.type);
      });

      if (!isAllFilesValid) {
        setErrorMessage('이미지 파일만 넣어주세요');
        return;
      } else {
        setErrorMessage('');
      }
      const options = {
        maxSizeMB: 0.5,
      };
      const compressedImages = await Promise.all(
        fileList.map(file => imageCompression(file, options))
      );
      setImageList(compressedImages);
      const previewURLs = compressedImages.map(file => URL.createObjectURL(file));
      setPreviewImages(previewURLs);
    }
  };

  return {
    imageList,
    previewImages,
    errorMessage,
    imageHandler,
    setPreviewImages,
  };
};
