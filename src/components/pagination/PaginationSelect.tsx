import { useLocation } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Options } from '../../types/types';
import FieldSet from '../fieldset/FieldSet';
import Selectbox from '../selectbox/Selectbox';

export type PaginationSelectProps = {
  defaultValue: Options;
  totalCount: number;
  onSelectCount: (option: Options) => void;
};

const PaginationSelect = ({
  defaultValue,
  onSelectCount,
  totalCount,
}: PaginationSelectProps) => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const { isTabletSize } = useMediaQuery();
  const selectProductCountList = ['8', '16', '32'];

  const options = [...selectProductCountList, String(totalCount)]
    .filter(
      (count, index, values) =>
        Number(count) <= totalCount && values.indexOf(count) === index,
    )
    .map((count) => ({
      value: count,
      label: count,
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
          defaultValue={defaultValue}
          inputHasNoLabel
        />
      </FieldSet>
      {!isTabletSize && <p>{language.productPerPage}</p>}
    </form>
  );
};

export default PaginationSelect;
