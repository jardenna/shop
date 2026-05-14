export interface PaginationItem {
  label: string;
  type: 'page' | 'jumpPrevious' | 'jumpNext';
  value: number;
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

  const previousJumpItem: PaginationItem[] =
    rangeStart > 1
      ? [
          {
            type: 'jumpPrevious',
            value: Math.max(1, page - pageLimit),
            label: '...',
          },
        ]
      : [];

  const nextJumpItem: PaginationItem[] =
    rangeEnd < totalBtns
      ? [
          {
            type: 'jumpNext',
            value: Math.min(totalBtns, page + pageLimit),
            label: '...',
          },
        ]
      : [];

  return [...previousJumpItem, ...pageItems, ...nextJumpItem];
};
