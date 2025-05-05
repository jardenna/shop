import { FileName } from '../../../app/api/apiTypes';
import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import FormLabel from '../FormLabel';
import './_file-input.scss';
import Preview, { PreviewProps } from './Preview';

type FileInputProps = PreviewProps & {
  id: string;
  name: FileName;
  errorText?: string;
  inputHasNoLabel?: boolean;
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
  inputHasNoLabel,
  errorText,
}: FileInputProps) => {
  const { language } = useLanguage();

  return (
    <div>
      <div className="file-container">
        <FormLabel
          required={required}
          labelText={language.browseImages}
          id="images"
          inputHasNoLabel={inputHasNoLabel}
          errorText={errorText}
          className="file-upload-label"
          iconName={IconName.Upload}
        />

        <input
          type="file"
          onChange={onChange}
          name={name}
          id={id}
          multiple={multiple}
          required={required}
          className="visually-hidden"
          aria-invalid={errorText ? true : undefined}
          aria-required={required || undefined}
          aria-errormessage={errorText ? `err-${id}` : undefined}
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
