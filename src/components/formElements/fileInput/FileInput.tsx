import { FileName } from '../../../app/api/apiTypes';
import { PreviewImg } from '../../../hooks/useFormValidation';
import { ChangeInputType } from '../../../types/types';
import Input from '../Input';
import './_file-input.scss';
import Preview from './Preview';

type FileInputProps = {
  ariaLabel: string;
  id: string;
  labelText: string;
  name: FileName;
  previewData: PreviewImg[];
  title: string;
  multiple?: boolean;
  required?: boolean;
  onChange: (event: ChangeInputType) => void;
  onRemoveImg: () => void;
};

const FileInput = ({
  onChange,
  name,
  id,
  labelText,
  multiple,
  required,
  onRemoveImg,
  ariaLabel,
  title,
  previewData,
}: FileInputProps) => (
  <div className="file-container">
    <Input
      type="file"
      onChange={onChange}
      name={name}
      id={id}
      value=""
      multiple={multiple}
      required={required}
      labelText={labelText}
    />

    <Preview
      previewData={previewData}
      title={title}
      ariaLabel={ariaLabel}
      onRemoveImg={onRemoveImg}
    />
  </div>
);

export default FileInput;
