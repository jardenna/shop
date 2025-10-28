import FileInput from '../../../components/formElements/fileInput/FileInput';
import ImgListItem from '../../../components/formElements/fileInput/ImgListItem';
import type { PreviewProps } from '../../../components/formElements/fileInput/Preview';
import Preview from '../../../components/formElements/fileInput/Preview';
import InputInfo from '../../../components/formElements/InputInfo';
import type { InputChangeHandler } from '../../../types/types';
import { allowedExtensions, maxFiles } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';

type ImageUploadProps = PreviewProps & {
  disabledImages: string[];
  images: string[];
  onChange: InputChangeHandler;
  onToggleImage: (id: string) => void;
};

const ImageUpload = ({
  images,
  removePreviewImage,
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
  const inputInfoText = `${language.filesSupported}  ${allowedImages} | ${language.maximumFileSize} 1MB`;

  // Error text for too many img files
  const errorText = `${language.maximum} ${maxFiles} ${language.filesCanBeUploaded} ${language.pleaseRemoveOneOrMore}`;

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
        />
      </div>

      <InputInfo inputInfo={inputInfoText} />
      {previewData.length > maxFiles && <p>{errorText}</p>}
      {previewData.length > 0 && (
        <Preview
          previewData={previewData}
          ariaLabel={ariaLabel}
          removePreviewImage={removePreviewImage}
        />
      )}
    </div>
  );
};

export default ImageUpload;
