import { useState } from 'react';
import { useUploadImageMutation } from '../uploadImageApiSlice';

const ImageUploadForm = () => {
  const [name, setName] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [uploadImages, { isLoading }] = useUploadImageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
      setPreviewUrls(
        Array.from(selectedFiles).map((file) => URL.createObjectURL(file)),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const uploadResponse = await uploadImages(formData).unwrap();
      const imageUrls = uploadResponse.images; // returnerer array af image URLs

      const productData = {
        name,
        imageUrls, // brug disse URLs til at oprette produktet
      };

      // Opret produkt med de uploadede billeder
      // fx createProduct(productData)
      console.log(productData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e: any) => {
          setName(e.target.value);
        }}
        placeholder="Name"
        required
      />
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
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
