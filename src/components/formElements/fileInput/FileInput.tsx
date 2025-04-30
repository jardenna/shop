import { FileName } from '../../../app/api/apiTypes';
import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import Icon from '../../icons/Icon';
import './_file-input.scss';
import Preview, { PreviewProps } from './Preview';

type FileInputProps = PreviewProps & {
  id: string;
  name: FileName;
  multiple?: boolean;
  required?: boolean;
  onChange: (event: ChangeInputType) => void;
};

const FileInput = ({
  onChange,
  name,
  id,
  multiple,
  required,
  onRemoveImg,
  ariaLabel,
  title,
  previewData,
}: FileInputProps) => {
  const { language } = useLanguage();
  return (
    <div>
      <div className="file-container">
        <label htmlFor="images" className="file-upload-label">
          <Icon iconName={IconName.Upload} title="upload" ariaHidden />
          <span>{language.browseImages}</span>
        </label>
        <input
          type="file"
          onChange={onChange}
          name={name}
          id={id}
          multiple={multiple}
          required={required}
          className="visually-hidden"
        />
        {previewData.length > 0 && (
          <Preview
            previewData={previewData}
            title={title}
            ariaLabel={ariaLabel}
            onRemoveImg={onRemoveImg}
          />
        )}
      </div>
      <span className="text-italic">
        {language.filesSuported}: .jpg, .png , webp
      </span>
    </div>
  );
};

export default FileInput;
