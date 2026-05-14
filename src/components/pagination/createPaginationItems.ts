import { BtnVariant } from '../../types/enums';

export interface PaginationItem {
  label: string;
  type: 'page' | 'jumpPrevious' | 'jumpNext';
  value: number;
  ariaLabel?: string;
  btnVariant?: BtnVariant;
  disabled?: boolean;
}

const createPageItems = (
  startPage: number,
  endPage: number,
): PaginationItem[] => {
  if (startPage > endPage) {
    return [];
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, indexValue) => {
    const currentPage = startPage + indexValue;

    return {
      type: 'page',
      value: currentPage,
      label: currentPage.toString(),
    };
  });
};

export const createPaginationItems = (
  page: number,
  totalBtns: number,
  pageLimit: number,
): PaginationItem[] => {
  const halfPageLimit = Math.floor(pageLimit / 2);

  let rangeStart = Math.max(1, page - halfPageLimit);

  const rangeEnd = Math.min(totalBtns, rangeStart + pageLimit - 1);

  if (rangeEnd - rangeStart + 1 < pageLimit) {
    rangeStart = Math.max(1, rangeEnd - pageLimit + 1);
  }

  const pageItems = createPageItems(rangeStart, rangeEnd);

  const previousPageValue = Math.max(1, page - pageLimit);

  const nextPageValue = Math.min(totalBtns, page + pageLimit);

  const previousPageCount = page - previousPageValue;

  const nextPageCount = nextPageValue - page;

  const previousJumpItem: PaginationItem = {
    type: 'jumpPrevious',
    value: Math.max(1, page - pageLimit),
    label: '...',
    disabled: rangeStart === 1,
    ariaLabel: `Go ${previousPageCount} pages back`,
    btnVariant: BtnVariant.Ghost,
  };

  const nextJumpItem: PaginationItem = {
    type: 'jumpNext',
    value: Math.min(totalBtns, page + pageLimit),
    label: '...',
    ariaLabel: `Go ${nextPageCount} pages forward`,
    disabled: rangeEnd === totalBtns,
    btnVariant: BtnVariant.Ghost,
  };

  return [previousJumpItem, ...pageItems, nextJumpItem];
};
