import { useLanguage } from '../../../features/language/useLanguage';
import Input from '../../formElements/Input';
import { BaseTableFilterProps } from './TableFilterPopup';

const TableFilterInput = ({
  title,
  name,
  onFilterRows,
  value,
  filterType,
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
        className="table-filter-input"
        type={filterType}
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
