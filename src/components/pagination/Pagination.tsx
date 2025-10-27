import PaginationNav, { type PaginationNavProps } from './PaginationNav';
import PaginationSelect, {
  type PaginationSelectProps,
} from './PaginationSelect';

const Pagination = ({
  page,
  totalBtns,
  onPagination,
  defaultValue,
  onSelectCount,
  selectInfo,
  optionList,
  totalCount,
  paginationMobileText,
}: PaginationNavProps & PaginationSelectProps) => (
  <section className="pagination">
    <PaginationNav
      totalBtns={totalBtns}
      page={page}
      onPagination={onPagination}
      paginationMobileText={paginationMobileText}
    />
    <PaginationSelect
      optionList={optionList}
      onSelectCount={onSelectCount}
      defaultValue={defaultValue}
      selectInfo={selectInfo}
      totalCount={totalCount}
    />
  </section>
);

export default Pagination;
