import FileInput from '../../../components/formElements/fileInput/FileInput';
import ImgListItem from '../../../components/formElements/fileInput/ImgListItem';
import Preview from '../../../components/formElements/fileInput/Preview';
import InputInfo from '../../../components/formElements/InputInfo';
import { PreviewImg } from '../../../hooks/useFormValidation';
import { ChangePureInputType } from '../../../types/types';
import { allowedExtensions } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';

type ImageUploadProps = {
  ariaLabel: string;
  disabledImages: string[];
  images: string[];
  previewData: PreviewImg[];
  onChange: (event: ChangePureInputType) => void;
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

  const allowedImages = allowedExtensions
    .map((ext) => ext.toUpperCase())
    .join(', ');
  const inputInfoText = `${language.filesSuported}  ${allowedImages} | ${language.maximumFileSize} 1MB`;

  return (
    <div>
      <div className="upload-img-container">
        {images.length > 0 && (
          <ul className="img-list">
            {images.map((img, index) => (
              <ImgListItem
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
        )}
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
      </div>
      <InputInfo inputInfo={inputInfoText} />
      {previewData.length > 0 && (
        <Preview
          previewData={previewData}
          title="title"
          ariaLabel={ariaLabel}
          onRemoveImg={(name: string) => {
            onRemovePreviewImage(name);
          }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
