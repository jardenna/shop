import { useLocation } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import FieldSet from '../fieldset/FieldSet';
import Selectbox from '../selectbox/Selectbox';
import type { BasePaginationSelectProps } from './Pagination';

export type PageCountOptions = {
  label: string;
  value: string;
};

type PaginationSelectProps = BasePaginationSelectProps & {
  ariaText: string;
};

const PaginationSelect = ({
  options,
  defaultValue,
  onSelectCount,
  isOptionDisabled,
  selectInfo,
  ariaText,
}: PaginationSelectProps) => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  return (
    <form className="pagination-select">
      <FieldSet legendText={language.displayOptions}>
        <Selectbox
          selectKey={`perpage-${pathname}`}
          name="productCount"
          options={options}
          id="productCount"
          onChange={onSelectCount}
          labelText={language.selectNumber}
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
