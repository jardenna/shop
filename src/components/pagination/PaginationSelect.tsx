import { useLocation } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { OptionType } from '../../shared/types';
import FieldSet from '../fieldset/FieldSet';
import Selectbox from '../selectbox/Selectbox';

export interface PaginationSelectProps {
  totalCount: number;
  onSelectCount: (option: OptionType) => void;
}

const PaginationSelect = ({
  onSelectCount,
  totalCount,
}: PaginationSelectProps) => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const { isLargeTabletSize } = useMediaQuery();
  const selectProductCountList = ['8', '16', '32'];

  const options = [...selectProductCountList, String(totalCount)]
    .filter(
      (count, index, values) =>
        Number(count) <= totalCount && values.indexOf(count) === index,
    )
    .map((count) => ({
      value: count,
      label: count,
      id: count,
    }));

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
          inputHasNoLabel
          variant="secondary"
        />
      </FieldSet>
      {!isLargeTabletSize && <p>{language.productPerPage}</p>}
    </form>
  );
};

export default PaginationSelect;
