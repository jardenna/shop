import { useLocation } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { PaginationCount } from '../../hooks/useSearchParamsState';
import FieldSet from '../fieldset/FieldSet';
import Selectbox from '../selectbox/Selectbox';

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
  const paginationCountList: PaginationCount[] = [8, 16, 32];

  const selectPaginationCountOptions = paginationCountList
    .filter((count) => count <= totalCount)
    .map((count) => ({
      label: String(count),
      value: String(count),
    }));

  return (
    <form className="pagination-select">
      <FieldSet legendText={language.displayOptions}>
        <Selectbox
          selectKey={`perpage-${pathname}`}
          name="productCount"
          options={selectPaginationCountOptions}
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
