import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PaginationProps } from './Pagination';

export enum PaginationActionEnum {
  First = 'First',
  Last = 'Last',
  Next = 'Next',
  NextPaginationItem = 'jump-next',
  Prev = 'Prev',
  PrevPaginationItem = 'jump-prev',
}

export type OmittedPaginationProps = Omit<PaginationProps, 'selectedPage'>;

interface UsePaginationProps extends OmittedPaginationProps {
  addCurrentPageToParams?: boolean;
}

const usePagination = ({
  totalCount,
  rowsPerPage,
  pageLimit,
  currentPage,
  setCurrentPage,
  addCurrentPageToParams,
}: UsePaginationProps) => {
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [pageRange, setPageRange] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Calculate total page count whenever totalCount or rowsPerPage changes
  useEffect(() => {
    const pageCount = Math.ceil(totalCount / rowsPerPage);
    setTotalPageCount(pageCount);
  }, [totalCount, rowsPerPage]);

  // Generate the page range based on current page and pageLimit
  useEffect(() => {
    if (totalPageCount === 0) {
      setPageRange([]);
      return;
    }

    // Determine the start and end of the page range
    const halfPageLimit = Math.floor(pageLimit / 2);
    let rangeStart = Math.max(1, currentPage - halfPageLimit);
    const rangeEnd = Math.min(totalPageCount, rangeStart + pageLimit - 1);

    // Adjust the range if it doesn't fill up the pageLimit
    if (rangeEnd - rangeStart + 1 < pageLimit) {
      rangeStart = Math.max(1, rangeEnd - pageLimit + 1);
    }

    const pages = Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) => rangeStart + i,
    );

    setPageRange(pages);
  }, [currentPage, totalPageCount, pageLimit]);

  // Set currentPage to 1 when rowsPerPage is changes
  useEffect(() => {
    setCurrentPage(1);

    if (totalCount < rowsPerPage) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
    // setPageRange([]);
  }, [rowsPerPage, totalCount]);

  const handlePaginationItemClick = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPageCount))); // keep within bounds

      if (addCurrentPageToParams) {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
      }
    },
    [
      setCurrentPage,
      totalPageCount,
      addCurrentPageToParams,
      searchParams,
      setSearchParams,
    ],
  );
  // Unified pagination handler
  const paginationActions = {
    [PaginationActionEnum.First]: () => {
      handlePaginationItemClick(1);
    },
    [PaginationActionEnum.Prev]: () => {
      handlePaginationItemClick(currentPage - 1);
    },
    [PaginationActionEnum.Next]: () => {
      handlePaginationItemClick(currentPage + 1);
    },
    [PaginationActionEnum.Last]: () => {
      handlePaginationItemClick(totalPageCount);
    },
    [PaginationActionEnum.PrevPaginationItem]: () => {
      handlePaginationItemClick(Math.max(1, currentPage - pageLimit));
    },
    [PaginationActionEnum.NextPaginationItem]: () => {
      handlePaginationItemClick(
        Math.min(totalPageCount, currentPage + pageLimit),
      );
    },
  };

  const handlePaginationAction = (action: PaginationActionEnum) => {
    const actionHandler = paginationActions[action];

    actionHandler();
  };

  return {
    totalPageCount,
    pageRange,
    onPaginationItemClick: handlePaginationItemClick,
    onPaginationAction: handlePaginationAction,
  };
};

export default usePagination;
