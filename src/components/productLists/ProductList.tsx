import { ReactNode } from 'react';
import { OptionGroupHeading } from '../../types/types';
import OptionGroupTitle from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  children: ReactNode;
  groupTitle?: OptionGroupHeading;
  required?: boolean;
};

const ProductList = ({ children, groupTitle, required }: ProductListProps) => (
  <section className="product-list-container">
    {groupTitle && (
      <OptionGroupTitle groupTitle={groupTitle} required={required} />
    )}
    <ul className="product-list" id={groupTitle?.id}>
      {children}
    </ul>
  </section>
);

export default ProductList;
