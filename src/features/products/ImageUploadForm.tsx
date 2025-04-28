import useFormValidation from '../../hooks/useFormValidation';
import { useUploadImageMutation } from '../uploadImageApiSlice';

const ImageUploadForm = () => {
  const [uploadImages, { isLoading }] = useUploadImageMutation();

  const { onChange, onSubmit, previewUrls, filesData } = useFormValidation({
    initialState: { files: '' },
    callback: handleSubmit,
  });

  async function handleSubmit() {
    if (filesData.length === 0) {
      return;
    }

    const formData = new FormData();
    filesData.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const uploadResponse = await uploadImages(formData).unwrap();
      const imageUrls = uploadResponse.images; // returnerer array af image URLs

      const productData = {
        imageUrls, // brug disse URLs til at oprette produktet
      };

      // Opret produkt med de uploadede billeder
      // fx createProduct(productData)
      console.log(productData);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={onChange}
        multiple // tillader flere filer
        required
      />
      <div className="flex gap-4">
        {previewUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Preview ${idx + 1}`}
            className="max-w-xs rounded shadow"
          />
        ))}
      </div>
      <button type="submit">{isLoading ? '..loading' : 'klik'}</button>
    </form>
  );
};

export default ImageUploadForm;
