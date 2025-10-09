import { useState } from 'react';
import LayoutElement from '../../layout/LayoutElement';
import { IconName } from '../../types/enums';
import Button from '../Button';
import IconBtn from '../IconBtn';
import './_pagination.scss';

type PaginationProps = {
  currentPage: number;
  productsPerPage: number;
  totalCount: number;
  maxPaginationBtns?: number;
};

// Creates an array of pagination button numbers to display in the UI
function calculateBtnsRange(
  currentPage: number,
  totalBtns: number,
  maxPaginationBtns: number,
) {
  // Determine which "button group" the current page belongs to
  const startBtn =
    Math.floor((currentPage - 1) / maxPaginationBtns) * maxPaginationBtns + 1;

  // Find the last button number in the current visible group
  const endBtn = Math.min(startBtn + maxPaginationBtns - 1, totalBtns);

  const range = Array.from(
    { length: endBtn - startBtn + 1 },
    (_, i) => startBtn + i,
  );

  return range;
}

const Pagination = ({
  currentPage,
  maxPaginationBtns = 5,
  productsPerPage,
  totalCount,
}: PaginationProps) => {
  const [pageNumber, setPageNumber] = useState(currentPage);
  const totalBtns = Math.ceil(totalCount / productsPerPage);

  const paginationBtnList = calculateBtnsRange(
    currentPage,
    totalBtns,
    maxPaginationBtns,
  );

  const handleGotoPrevPage = () => {
    console.log(123);

    setPageNumber(currentPage - 1);
  };

  const handleGotoNextPage = () => {
    setPageNumber(currentPage + 1);
  };

  const handleFirstPage = () => {
    setPageNumber(1);
  };

  const handleGotoLastPage = () => {
    setPageNumber(totalBtns);
  };

  console.log(pageNumber);

  return (
    <LayoutElement as="nav" ariaLabel="pagination">
      <ul className="pagination-btn-list">
        <li>
          <IconBtn
            iconName={IconName.ChevronsLeft}
            title=""
            ariaLabel="first"
            onClick={handleFirstPage}
          />
        </li>
        <li>
          <IconBtn
            iconName={IconName.ChevronLeft}
            title=""
            ariaLabel="prev"
            onClick={handleGotoPrevPage}
          />
        </li>
        {paginationBtnList.map((paginationBtn) => (
          <li key={paginationBtn}>
            <Button>{paginationBtn}</Button>
          </li>
        ))}
        <li>
          <IconBtn
            iconName={IconName.ChevronRight}
            title=""
            ariaLabel="next"
            onClick={handleGotoNextPage}
          />
        </li>
        <li>
          <IconBtn
            iconName={IconName.ChevronsRight}
            title=""
            ariaLabel="last"
            onClick={handleGotoLastPage}
          />
        </li>
      </ul>
    </LayoutElement>
  );
};

export default Pagination;
