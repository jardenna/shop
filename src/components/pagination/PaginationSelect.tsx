import { useLocation } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import FieldSet from '../fieldset/FieldSet';
import SelectboxNew from '../selectbox/SelectboxNew';

export interface PaginationSelectProps {
  itemsPerPage: number;
  onSelectCount: any;
  totalCount: number;
}

const PaginationSelect = ({
  onSelectCount,
  totalCount,
  itemsPerPage,
}: PaginationSelectProps) => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const { isLargeTabletSize } = useMediaQuery();
  const selectPaginationCountList = ['8', '16', '32'];

  const selectProductCountOptions = selectPaginationCountList
    .filter((count) => Number(count) <= totalCount)
    .map((count) => ({
      label: count,
      value: count,
    }));

  return (
    <form className="pagination-select">
      <FieldSet legendText={language.displayOptions}>
        <SelectboxNew
          selectKey={`perpage-${pathname}`}
          name="productCount"
          options={selectProductCountOptions}
          id="productCount"
          onChange={onSelectCount}
          labelText={language.selectNumber}
          inputHasNoLabel
          variant="secondary"
          value={itemsPerPage.toString()}
        />
      </FieldSet>
      {!isLargeTabletSize && <p>{language.productPerPage}</p>}
    </form>
  );
};

export default PaginationSelect;
