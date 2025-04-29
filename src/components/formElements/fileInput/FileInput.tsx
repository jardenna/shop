import { FileName } from '../../../app/api/apiTypes';
import { IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import Icon from '../../icons/Icon';
import Input from '../Input';
import './_file-input.scss';
import Preview, { PreviewProps } from './Preview';

type FileInputProps = PreviewProps & {
  id: string;
  labelText: string;
  name: FileName;
  multiple?: boolean;
  required?: boolean;
  onChange: (event: ChangeInputType) => void;
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

    <div className="file-upload-btn">
      <Icon iconName={IconName.Upload} title="upload" />
      <span>Browse images</span>
      <span>Files suported: .jpg, .png , webp</span>
    </div>
    <Preview
      previewData={previewData}
      title={title}
      ariaLabel={ariaLabel}
      onRemoveImg={onRemoveImg}
    />
  </div>
);

export default FileInput;
