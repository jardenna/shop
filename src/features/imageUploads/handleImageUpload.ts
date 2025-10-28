import { BaseProduct } from '../../app/api/apiTypes/sharedApiTypes';
import { AppDispatch } from '../../app/store';
import shopApiSlice from '../shop/shopApiSlice';
import { useUploadImageMutation } from '../uploadImageApiSlice';

type HandleImageUploadParams = {
  activeImages: string[];
  dispatch: AppDispatch;
  filesData: File[];
  id: string | null;
  uploadImages: ReturnType<typeof useUploadImageMutation>[0];
};

async function handleImageUpload({
  id,
  activeImages,
  filesData,
  uploadImages,
  dispatch,
}: HandleImageUploadParams): Promise<string[]> {
  if (filesData.length === 0) {
    return activeImages;
  }

  const formData = new FormData();
  filesData.forEach((file) => {
    formData.append('images', file);
  });

  const { images: uploadedImages } = await uploadImages(formData).unwrap();
  const merged = [...activeImages, ...uploadedImages];

  if (id) {
    dispatch(
      shopApiSlice.util.updateQueryData(
        'getSingleProduct',
        id,
        (draft: BaseProduct) => {
          // eslint-disable-next-line no-param-reassign
          draft.images = merged;
        },
      ),
    );
  }

  return merged;
}

export default handleImageUpload;
