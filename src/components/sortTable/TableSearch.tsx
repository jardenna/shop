import { FormEvent, useRef } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType } from '../../types/types';
import Input from '../formElements/Input';

type TableSearchProps = {
  title: string;
  value: string;
  onFilterRows: (event: ChangeInputType) => void;
};

const TableSearch = ({ title, onFilterRows, value }: TableSearchProps) => {
  const { language } = useLanguage();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const text = `${language.filter} ${language[title]}`;
  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
      }}
    >
      <Input
        type="search"
        name={title}
        id={title}
        placeholder={text}
        value={value}
        onChange={onFilterRows}
        labelText={text}
        inputHasNoLabel
        ref={searchInputRef}
        autoFocus
      />
    </form>
  );
};

export default TableSearch;
