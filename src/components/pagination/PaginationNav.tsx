import { useLanguage } from '../../features/language/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import LayoutElement from '../../layout/LayoutElement';
import IconBtn from '../IconBtn';
import './_pagination.scss';
import { createPaginationItems } from './createPaginationItems';
import PaginationBtnItems from './PaginationBtnItems';

export type BasePaginationNav = {
  page: number;
  paginationMobileText: string;
  totalBtns: number;
  onPagination: (id: number) => void;
};

type PaginationNavProps = BasePaginationNav & {
  pageLimit?: number;
};

const PaginationNav = ({
  paginationMobileText,
  page,
  totalBtns,
  onPagination,
  pageLimit = 5,
}: PaginationNavProps) => {
  const { language } = useLanguage();
  const { isTabletSize } = useMediaQuery();

  const paginationBtnList = createPaginationItems(page, totalBtns, pageLimit);

  const handleGotoPrevPage = () => {
    if (page > 1) {
      onPagination(page - 1);
    }
  };

  const handleGotoNextPage = () => {
    if (page < totalBtns) {
      onPagination(page + 1);
    }
  };

  return (
    <LayoutElement as="nav" ariaLabel={language.pagination}>
      <ul className="pagination-btn-list">
        {!isTabletSize && (
          <li>
            <IconBtn
              iconName="chevronsLeft"
              ariaLabel={language.gotoFirstPage}
              onClick={() => {
                onPagination(1);
              }}
              disabled={page === 1}
            />
          </li>
        )}
        <li>
          <IconBtn
            iconName="chevronLeft"
            ariaLabel={language.gotoPrevPage}
            onClick={handleGotoPrevPage}
            disabled={page === 1}
          />
        </li>
        {isTabletSize ? (
          <li>{paginationMobileText}</li>
        ) : (
          <PaginationBtnItems
            paginationBtnList={paginationBtnList}
            page={page}
            onPagination={onPagination}
            language={language}
          />
        )}
        <li>
          <IconBtn
            iconName="chevronRight"
            ariaLabel={language.gotoNextPage}
            onClick={handleGotoNextPage}
            disabled={page === totalBtns}
          />
        </li>
        {!isTabletSize && (
          <li>
            <IconBtn
              iconName="chevronsRight"
              ariaLabel={language.gotoLastPage}
              onClick={() => {
                onPagination(totalBtns);
              }}
              disabled={page === totalBtns}
            />
          </li>
        )}
      </ul>
    </LayoutElement>
  );
};

export default PaginationNav;
