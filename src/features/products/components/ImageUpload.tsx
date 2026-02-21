import FileInput from '../../../components/formElements/fileInput/FileInput';
import ImgListItem from '../../../components/formElements/fileInput/ImgListItem';
import Preview, {
  type PreviewImg,
} from '../../../components/formElements/fileInput/Preview';
import InputInfo from '../../../components/formElements/InputInfo';
import type { InputChangeHandler } from '../../../types/types';
import { allowedExtensions, maxFiles } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';

export type BaseImageUploadProps = {
  previewData: PreviewImg[];
  removePreviewImage: (lastModified: number) => void;
};

type ImageUploadProps = BaseImageUploadProps & {
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
  onChange,
  previewData,
}: ImageUploadProps) => {
  const { language } = useLanguage();

  const allowedImages = allowedExtensions
    .map((ext) => ext.toUpperCase())
    .join(', ');

  // Tilladte filer  JPG, JPEG, PNG, WEBP, AVIF | Maksimal filstørrelse 1MB
  const inputInfoText = `${language.filesSupported}  ${allowedImages} | ${language.maximumFileSize} 1MB`;

  // Maksimalt 5 filer kan uploades fjern venligst en eller flere
  const errorText = `${language.maximum} ${maxFiles} ${language.filesCanBeUploaded} ${language.pleaseRemoveOneOrMore}`;
  const deleteAriaText = language.deleteFoto;
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
                ariaLabel={
                  disabledImages.includes(img)
                    ? language.undoDeleteImg
                    : deleteAriaText
                }
              />
            ))}
          </ul>
        )}
        <FileInput onChange={onChange} multiple name="images" id="images" />
      </div>

      <InputInfo inputInfo={inputInfoText} />
      {previewData.length > maxFiles && <p>{errorText}</p>}
      {previewData.length > 0 && (
        <Preview
          previewData={previewData}
          removePreviewImage={removePreviewImage}
          ariaLabel={deleteAriaText}
        />
      )}
    </div>
  );
};

export default ImageUpload;
