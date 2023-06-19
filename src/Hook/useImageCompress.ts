import imageCompression from 'browser-image-compression';

const useImageCompress = async (image: File | null) => {
  let resizingFile;

  if (image) {
    const resizingBlob = await imageCompression(image, { maxSizeMB: 0.5 });
    resizingFile = new File([resizingBlob], image.name, { type: image.type });
  }
  return resizingFile;
};

export default useImageCompress;
