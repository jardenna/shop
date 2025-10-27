import PaginationNav from './PaginationNav';
import PaginationSelect, { PageCountOptions } from './PaginationSelect';

export type PaginationNavProps = {
  page: number;
  paginationMobileText: string;
  totalBtns: number;
  onPagination: (id: number) => void;
};

export type BasePaginationSelectProps = {
  defaultValue: PageCountOptions;
  options: PageCountOptions[];
  selectInfo: string;
  isOptionDisabled?: (option: { value: string }) => boolean;
  onSelectCount: (option: PageCountOptions) => void;
};

type PaginationProps = PaginationNavProps & BasePaginationSelectProps;

const Pagination = ({
  page,
  totalBtns,
  onPagination,
  options,
  defaultValue,
  onSelectCount,
  isOptionDisabled,
  selectInfo,
  paginationMobileText,
}: PaginationProps) => (
  <section className="pagination">
    <PaginationNav
      totalBtns={totalBtns}
      page={page}
      onPagination={onPagination}
      paginationMobileText={paginationMobileText}
    />
    <PaginationSelect
      onSelectCount={onSelectCount}
      isOptionDisabled={isOptionDisabled}
      defaultValue={defaultValue}
      options={options}
      selectInfo={selectInfo}
    />
  </section>
);

export default Pagination;
