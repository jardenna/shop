import { useLanguage } from '../../../features/language/useLanguage';
import Input from '../../formElements/Input';
import { BaseTableFilterProps } from './TableFilterPopup';

const TableFilterInput = ({
  title,
  name,
  onFilterRows,
  value,
  searchType,
}: BaseTableFilterProps) => {
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
      />
    </form>
  );
};

export default TableFilterInput;
