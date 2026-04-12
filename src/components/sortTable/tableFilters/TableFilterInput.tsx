import { useLanguage } from '../../../features/language/useLanguage';
import FieldSet from '../../fieldset/FieldSet';
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
    <form className="table-filter-form">
      <FieldSet legendText={title}>
        <Input
          type={filterType}
          name={name}
          id={title}
          value={value}
          onChange={onFilterRows}
          labelText={text}
          autoFocus
        />
      </FieldSet>
    </form>
  );
};

export default TableFilterInput;
