/* eslint-disable no-nested-ternary */
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import type { PaginationItem } from './createPaginationItems';

type PaginationBtnItemsProps = {
  language: Record<string, string>;
  page: number;
  paginationBtnList: PaginationItem[];
  onPagination: (id: number) => void;
};

const PaginationBtnItems = ({
  paginationBtnList,
  onPagination,
  page,
  language,
}: PaginationBtnItemsProps) =>
  paginationBtnList.map((paginationBtn, indexValue) => {
    const isCurrentPage =
      paginationBtn.type === 'page' && paginationBtn.value === page;

    const isJumpButton = paginationBtn.type !== 'page';

    return (
      <li key={`${paginationBtn.type}-${paginationBtn.value}-${indexValue}`}>
        <Button
          onClick={() => {
            onPagination(paginationBtn.value);
          }}
          variant={isJumpButton ? BtnVariant.Ghost : undefined}
          disabled={paginationBtn.disabled}
          className={isCurrentPage ? 'current' : ''}
          ariaCurrent={isCurrentPage ? 'page' : undefined}
          ariaLabel={
            isJumpButton
              ? paginationBtn.type === 'jumpPrevious'
                ? language.jumpPagesBack
                : language.jumpPagesForth
              : isCurrentPage
                ? `${language.currentPage} ${paginationBtn.value}`
                : `${language.gotoPage} ${paginationBtn.value}`
          }
        >
          {paginationBtn.label}
        </Button>
      </li>
    );
  });

export default PaginationBtnItems;
