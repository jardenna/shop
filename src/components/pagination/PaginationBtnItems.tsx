import { BtnVariant, IconName } from '../../types/enums';
import Button from '../Button';
import Icon from '../icons/Icon';
import type { PaginationItem } from './createPaginationItems';
import { getAriaLabel } from './utils';

type PaginationBtnItemsProps = {
  language: Record<string, string>;
  page: number;
  paginationBtnList: PaginationItem[];
  onPagination: (id: number) => void;
};

const PaginationBtnItems = ({
  paginationBtnList,
  onPagination,
  language,
  page,
}: PaginationBtnItemsProps) =>
  paginationBtnList.map((paginationBtn) => {
    const isCurrentPage =
      paginationBtn.type === 'page' && paginationBtn.value === page;

    const isJumpButton = paginationBtn.type !== 'page';

    return (
      <li key={`${paginationBtn.type}-${paginationBtn.value}`}>
        <Button
          onClick={() => {
            onPagination(paginationBtn.value);
          }}
          variant={isJumpButton ? BtnVariant.Ghost : undefined}
          disabled={paginationBtn.disabled}
          className={isCurrentPage ? 'current' : ''}
          ariaCurrent={isCurrentPage ? 'page' : undefined}
          ariaLabel={getAriaLabel(paginationBtn, language, page)}
        >
          {isJumpButton ? (
            <Icon iconName={IconName.More} />
          ) : (
            paginationBtn.label
          )}
        </Button>
      </li>
    );
  });

export default PaginationBtnItems;
