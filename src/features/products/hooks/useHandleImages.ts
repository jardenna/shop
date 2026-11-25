import { useState } from 'react';

interface useHandleImagesProps {
  uploadedImg: string[];
}

export const useHandleImages = ({ uploadedImg }: useHandleImagesProps) => {
  const [disabledImages, setDisabledImages] = useState<string[]>([]);

  const handleToggleDisableImage = (img: string) => {
    setDisabledImages(
      disabledImages.includes(img)
        ? disabledImages.filter((i: string) => i !== img)
        : [...disabledImages, img],
    );
  };

  const activeImages = uploadedImg.filter(
    (img) => !disabledImages.includes(img),
  );

  const isImageTouched = uploadedImg.length !== activeImages.length;

  return {
    activeImages,
    isImageTouched,
    onToggleDisableImage: handleToggleDisableImage,
    disabledImages,
  };
};
