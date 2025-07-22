import { FormEvent } from 'react';
import useLanguage from '../../features/language/useLanguage';
import type { ChangeInputType } from '../../types/types';
import Input from '../formElements/Input';

type TableSearchInputProps = {
  title: string;
  value: string;
  onFilterRows: (event: ChangeInputType) => void;
};

const TableSearchInput = ({
  title,
  onFilterRows,
  value,
}: TableSearchInputProps) => {
  const { language } = useLanguage();
  const text = `${language.filter} ${language[title]}`;
  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
      }}
    >
      <Input
        className="table-search"
        type="search"
        name={title}
        id={title}
        placeholder={text}
        value={value}
        onChange={onFilterRows}
        labelText={text}
        inputHasNoLabel
        autoFocus
        autoComplete="on"
      />
    </form>
  );
};

export default TableSearchInput;
