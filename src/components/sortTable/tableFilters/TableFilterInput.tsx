import FieldSet from '../../fieldset/FieldSet';
import Input from '../../formElements/Input';
import { BaseTableFilterProps } from './TableFilterPopup';

interface TableFilterInputProps extends BaseTableFilterProps {
  labelText: string;
  legendText: string;
}

const TableFilterInput = ({
  id,
  name,
  onFilter,
  value,
  filterType,
  legendText,
  labelText,
}: TableFilterInputProps) => (
  <form className="table-filter-form">
    <FieldSet legendText={legendText}>
      <Input
        type={filterType}
        name={name}
        id={id}
        value={value}
        onChange={onFilter}
        labelText={labelText}
        autoFocus
      />
    </FieldSet>
  </form>
);

export default TableFilterInput;
