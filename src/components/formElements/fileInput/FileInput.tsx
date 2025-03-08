import { FC } from 'react';
import { FileUploadNameType } from '../../../app/api/apiTypes';
import { ChangeInputType } from '../../../types/types';
import Input from '../Input';
import './_file-input.scss';

interface FileInputProps {
  id: string;
  labelText: string;
  name: FileUploadNameType;
  title: string | null;
  onChange: (event: ChangeInputType) => void;
}

const FileInput: FC<FileInputProps> = ({
  onChange,
  name,
  id,
  labelText,
  title,
}) => (
  <div className="file-container">
    <span className="file-input-info text-ellipsis">{title}</span>
    <Input
      type="file"
      onChange={onChange}
      name={name}
      id={id}
      value=""
      labelText={labelText}
    />
  </div>
);

export default FileInput;
