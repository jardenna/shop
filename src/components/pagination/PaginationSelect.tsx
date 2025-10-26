import { useLocation } from 'react-router';
import FieldSet from '../fieldset/FieldSet';
import Selectbox from '../selectbox/Selectbox';
import type { BasePaginationSelectProps } from './Pagination';

export type PageCountOptions = {
  label: string;
  value: string;
};

type PaginationSelectProps = BasePaginationSelectProps & {
  ariaText: string;
  labelText: string;
  legendText: string;
};

const PaginationSelect = ({
  labelText,
  options,
  defaultValue,
  legendText,
  onSelectCount,
  isOptionDisabled,
  selectInfo,
  ariaText,
}: PaginationSelectProps) => {
  const { pathname } = useLocation();

  return (
    <form className="pagination-select">
      <FieldSet legendText={legendText}>
        <Selectbox
          selectKey={`perpage-${pathname}`}
          name="productCount"
          options={options}
          id="productCount"
          onChange={onSelectCount}
          labelText={labelText}
          defaultValue={defaultValue}
          inputHasNoLabel
          isOptionDisabled={isOptionDisabled}
        />
      </FieldSet>
      <p id={ariaText}>{selectInfo}</p>
    </form>
  );
};

export default PaginationSelect;
