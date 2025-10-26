import { useLocation } from 'react-router';
import FieldSet from '../fieldset/FieldSet';
import Selectbox from '../selectbox/Selectbox';

export type PageCountOptions = {
  label: string;
  value: string;
};

type PaginationSelectProps = {
  ariaText: string;
  defaultValue: PageCountOptions;
  labelText: string;
  legendText: string;
  options: PageCountOptions[];
  selectInfo: string;
  isOptionDisabled?: (option: { value: string }) => boolean;
  onSelectCount: (option: PageCountOptions) => void;
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
