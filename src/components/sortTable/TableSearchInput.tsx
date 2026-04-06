import { useLanguage } from '../../features/language/useLanguage';
import Input from '../formElements/Input';
import { BaseTableSearchProps } from './TableSearch';

const TableSearchInput = ({
  title,
  name,
  onFilterRows,
  value,
  searchType,
}: BaseTableSearchProps) => {
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
        type={searchType}
        name={name}
        id={title}
        placeholder={text}
        value={value}
        onChange={onFilterRows}
        labelText={text}
        inputHasNoLabel
        autoFocus
        inputMode="search"
      />
    </form>
  );
};

export default TableSearchInput;
