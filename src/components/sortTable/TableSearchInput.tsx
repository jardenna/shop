import useLanguage from '../../features/language/useLanguage';
import type { InputChangeHandler } from '../../types/types';
import Input from '../formElements/Input';

type TableSearchInputProps = {
  onFilterRows: InputChangeHandler;
  title: string;
  value: string;
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
      onSubmit={(event) => {
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
      />
    </form>
  );
};

export default TableSearchInput;
