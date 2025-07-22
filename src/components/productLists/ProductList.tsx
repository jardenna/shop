import { ReactNode } from 'react';
import { OptionGroupHeading } from '../../types/types';
import OptionGroupTitle from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  children: ReactNode;
  groupTitle?: OptionGroupHeading;
};

const ProductList = ({ children, groupTitle }: ProductListProps) => (
  <div>
    {groupTitle && <OptionGroupTitle groupTitle={groupTitle} />}
    <ul className="product-list" id={groupTitle?.id}>
      {children}
    </ul>
  </div>
);

export default ProductList;
