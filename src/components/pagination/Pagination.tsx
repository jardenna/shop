import { Dispatch, FC, SetStateAction } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import IconContent from '../IconContent';
import './_pagination.scss';
import PaginationItem from './PaginationItem';
import usePagination, { PaginationActionEnum } from './usePagination';

export interface PaginationProps {
  currentPage: number;
  pageLimit: number;
  rowsPerPage: number;
  selectedPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageLimit,
  selectedPage,
  setCurrentPage,
  rowsPerPage,
}) => {
  const { language } = useLanguage();
  const {
    pageRange,
    totalPageCount,
    onPaginationItemClick,
    onPaginationAction,
  } = usePagination({
    totalCount,
    rowsPerPage,
    pageLimit,
    currentPage: selectedPage,
    setCurrentPage,
    addCurrentPageToParams: true,
  });

  return (
    <ul className="pagination">
      {/* First Page */}
      <PaginationItem
        onSetCurrentPage={() => {
          onPaginationAction(PaginationActionEnum.First);
        }}
        disabled={currentPage === 1}
        content={
          <IconContent
            iconName={IconName.ChevronLeft}
            title={language.chevronLeft}
            ariaLabel={language.gotoFirstPage}
          />
        }
      />

      {/* Prev Page */}
      <PaginationItem
        onSetCurrentPage={() => {
          onPaginationAction(PaginationActionEnum.Prev);
        }}
        disabled={currentPage === 1}
        content={
          <IconContent
            iconName={IconName.ChevronLeft}
            title={language.chevronsLeft}
            ariaLabel={language.gotoPrevPage}
          />
        }
      />

      {/* Jump Previous */}
      <PaginationItem
        disabled={currentPage < pageLimit}
        onSetCurrentPage={() => {
          onPaginationAction(PaginationActionEnum.PrevPaginationItem);
        }}
        content={
          <IconContent
            iconName={IconName.More}
            title={language.threeVerticalDots}
            ariaLabel={language.jumpPagesBack}
          />
        }
      />

      {/* Page Numbers */}
      {pageRange.map((page) => (
        <PaginationItem
          key={page}
          onSetCurrentPage={() => {
            onPaginationItemClick(page);
          }}
          paginationCount={page}
          ariaLabel={`${language.page} ${page} ${language.of} ${totalPageCount}`}
          isBtnSelected={page === currentPage}
          ariaDescribedby="current-status"
          disabled={page === currentPage}
        />
      ))}

      {/* Jump Next */}
      <PaginationItem
        onSetCurrentPage={() => {
          onPaginationAction(PaginationActionEnum.NextPaginationItem);
        }}
        disabled={currentPage > totalPageCount - pageLimit}
        content={
          <IconContent
            iconName={IconName.More}
            title={language.threeVerticalDots}
            ariaLabel={language.jumpPagesForth}
          />
        }
      />

      {/* Next Page */}
      <PaginationItem
        onSetCurrentPage={() => {
          onPaginationAction(PaginationActionEnum.Next);
        }}
        disabled={currentPage === totalPageCount}
        content={
          <IconContent
            iconName={IconName.ChevronRight}
            title={language.chevronRight}
            ariaLabel={language.gotoNextPage}
          />
        }
      />

      {/* Last Page */}
      <PaginationItem
        onSetCurrentPage={() => {
          onPaginationAction(PaginationActionEnum.Last);
        }}
        disabled={currentPage === totalPageCount}
        className="last-pagination-item"
        content={
          <IconContent
            iconName={IconName.ChevronsRight}
            title={language.chevronsRight}
            ariaLabel={language.gotoLastPage}
          />
        }
      />
    </ul>
  );
};

export default Pagination;
