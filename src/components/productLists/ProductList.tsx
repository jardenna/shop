import { ReactNode } from 'react';
import type { OptionGroupHeading } from '../../types/types';
import OptionGroupTitle from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  children: ReactNode;
  groupTitle?: OptionGroupHeading;
};

const ProductList = ({ children, groupTitle }: ProductListProps) => (
  <section>
    {groupTitle && <OptionGroupTitle groupTitle={groupTitle} />}
    <ul className="product-list" id={groupTitle?.id}>
      {children}
    </ul>
  </section>
);

export default ProductList;
