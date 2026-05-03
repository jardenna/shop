import Input from '../../formElements/Input';
import { BaseTableFilterProps } from './TableFilterPopup';

interface TableFilterInputProps extends BaseTableFilterProps {
  labelText: string;
}

const TableFilterInput = ({
  id,
  name,
  onFilter,
  value,
  filterType,

  labelText,
}: TableFilterInputProps) => (
  <form className="table-filter-form">
    <Input
      type={filterType}
      name={name}
      id={id}
      value={value}
      onChange={onFilter}
      labelText={labelText}
      autoFocus
    />
  </form>
);

export default TableFilterInput;
