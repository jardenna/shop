import type { ReactNode } from 'react';
import type { OptionGroupHeading } from '../../types/types';
import OptionGroupTitle from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  children: ReactNode;
  className?: string;
  groupTitle?: OptionGroupHeading;
};

const ProductList = ({ children, groupTitle, className }: ProductListProps) => (
  <div>
    {groupTitle && <OptionGroupTitle groupTitle={groupTitle} />}
    <ul className={`product-list ${className}`} id={groupTitle?.id}>
      {children}
    </ul>
  </div>
);

export default ProductList;
