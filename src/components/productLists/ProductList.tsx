import { ReactNode } from 'react';
import { OptionGroupHeading } from '../../types/types';
import OptionGroupTitle from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  children: ReactNode;
  errorText?: string;
  groupTitle?: OptionGroupHeading;
};

const ProductList = ({ children, errorText, groupTitle }: ProductListProps) => (
  <div>
    {groupTitle && (
      <OptionGroupTitle errorText={errorText} groupTitle={groupTitle} />
    )}

    <ul className="product-list" id={groupTitle?.id}>
      {children}
    </ul>
  </div>
);

export default ProductList;
