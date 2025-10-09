import { ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';

type PaginationItemProps = {
  ariaDescribedby?: string;
  ariaLabel?: string;
  className?: string;
  content?: ReactNode;
  disabled?: boolean;
  isBtnSelected?: boolean;
  paginationCount?: number;
  onSetCurrentPage: () => void;
};

const PaginationItem = ({
  content,
  onSetCurrentPage,
  paginationCount,
  ariaLabel,
  isBtnSelected,
  ariaDescribedby,
  disabled,
  className = '',
}: PaginationItemProps) => (
  <li className="pagination-item">
    <Button
      variant={BtnVariant.Ghost}
      disabled={disabled}
      ariaLabel={ariaLabel}
      className={`${isBtnSelected ? 'active' : ''} ${className}`}
      onClick={onSetCurrentPage}
      ariaDescribedby={ariaDescribedby}
    >
      <span className="pagination-item-content">
        {content || paginationCount}
      </span>
    </Button>
  </li>
);

export default PaginationItem;
