import FileInput from '../../../components/formElements/fileInput/FileInput';
import ProductImgList from '../../../components/formElements/fileInput/ProductImgList';
import { PreviewImg } from '../../../hooks/useFormValidation';
import { ChangeInputType } from '../../../types/types';
import useLanguage from '../../language/useLanguage';

type ImageUploadProps = {
  ariaLabel: string;
  disabledImages: string[];
  images: string[];
  previewData: PreviewImg[];
  onChange: (event: ChangeInputType) => void;
  onRemovePreviewImage: (id: string) => void;
  onToggleImage: (id: string) => void;
};
const ImageUpload = ({
  images,
  onRemovePreviewImage,
  onToggleImage,
  disabledImages,
  ariaLabel,
  onChange,
  previewData,
}: ImageUploadProps) => {
  const { language } = useLanguage();

  return (
    <>
      <ul className="preview-list uploaded-img">
        {images.map((img, index) => (
          <ProductImgList
            key={index}
            onClick={() => {
              onToggleImage(img);
            }}
            isImgDisabled={disabledImages.includes(img)}
            img={img}
            ariaLabel={ariaLabel}
            title={language.trash}
          />
        ))}
      </ul>
      <FileInput
        onChange={onChange}
        multiple
        name="images"
        id="images"
        previewData={previewData}
        title={language.delete}
        ariaLabel={language.delete}
        onRemoveImg={(name: string) => {
          onRemovePreviewImage(name);
        }}
      />
    </>
  );
};

export default ImageUpload;
