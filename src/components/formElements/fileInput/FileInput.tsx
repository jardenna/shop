import type { FileName } from '../../../app/api/apiTypes/adminApiTypes';
import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { InputChangeHandler } from '../../../types/types';
import Icon from '../../icons/Icon';
import './_file-input.scss';
import { PreviewProps } from './Preview';

type FileInputProps = PreviewProps & {
  id: string;
  name: FileName;
  onChange: InputChangeHandler;
  errorText?: string;
  multiple?: boolean;
  required?: boolean;
};

const FileInput = ({
  onChange,
  name,
  id,
  multiple,
  required,
  errorText,
}: FileInputProps) => {
  const { language } = useLanguage();

  return (
    <div>
      <label htmlFor="images" className="file-upload-label btn btn-primary">
        <Icon iconName={IconName.Upload} title="iconName" />
        {language.browseImages}
      </label>
      <input
        type="file"
        onChange={onChange}
        name={name}
        id={id}
        multiple={multiple}
        className="visually-hidden"
        aria-invalid={errorText ? true : undefined}
        aria-required={required || undefined}
        aria-errormessage={errorText ? `err-${id}` : undefined}
      />
    </div>
  );
};

export default FileInput;
