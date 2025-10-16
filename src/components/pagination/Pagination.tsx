import { useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { IconName } from '../../types/enums';
import { pageParamKey } from '../../utils/utils';
import Button from '../Button';
import IconBtn from '../IconBtn';
import './_pagination.scss';

type PaginationProps = {
  ariaDescribedby: string;
  headingRef: React.RefObject<HTMLElement | null>;
  page: number;
  totalBtns: number;
};

const Pagination = ({
  ariaDescribedby,
  headingRef,
  page,
  totalBtns,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const paginationBtnList = Array.from({ length: totalBtns }, (_, i) => i + 1);

  useLayoutEffect(() => {
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  const handlePagination = (id: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParamKey, id.toString());
    setSearchParams(newParams);
  };

  const handleGotoPrevPage = () => {
    if (page > 1) {
      handlePagination(page - 1);
    }
  };

  const handleGotoNextPage = () => {
    if (page < totalBtns) {
      handlePagination(page + 1);
    }
  };

  return (
    <LayoutElement
      as="nav"
      ariaLabel={language.pagination}
      className="pagination"
    >
      <ul className="pagination-btn-list" aria-describedby={ariaDescribedby}>
        <li>
          <IconBtn
            iconName={IconName.ChevronsLeft}
            ariaLabel={language.gotoFirstPage}
            onClick={() => {
              handlePagination(1);
            }}
            disabled={page === 1}
          />
        </li>
        <li>
          <IconBtn
            iconName={IconName.ChevronLeft}
            ariaLabel={language.gotoPrevPage}
            onClick={handleGotoPrevPage}
            disabled={page === 1}
          />
        </li>
        {paginationBtnList.map((paginationBtn) => (
          <li key={paginationBtn}>
            <Button
              onClick={() => {
                // Early exit so current page doesn't spam history or rerender
                if (paginationBtn === page) {
                  return;
                }
                handlePagination(paginationBtn);
              }}
              className={paginationBtn === page ? 'current' : ''}
              ariaCurrent={paginationBtn === page ? 'page' : undefined}
              ariaLabel={
                paginationBtn === page
                  ? `${language.currentPage} ${paginationBtn}`
                  : `${language.gotoPage} ${paginationBtn}`
              }
            >
              {paginationBtn}
            </Button>
          </li>
        ))}
        <li>
          <IconBtn
            iconName={IconName.ChevronRight}
            ariaLabel={language.gotoNextPage}
            onClick={handleGotoNextPage}
            disabled={page === totalBtns}
          />
        </li>
        <li>
          <IconBtn
            iconName={IconName.ChevronsRight}
            ariaLabel={language.gotoLastPage}
            onClick={() => {
              handlePagination(totalBtns);
            }}
            disabled={page === totalBtns}
          />
        </li>
      </ul>
    </LayoutElement>
  );
};

export default Pagination;
