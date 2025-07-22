import { ReactNode } from 'react';
import OptionGroupTitle, { OptionGroupTitle1 } from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  children: ReactNode;
  errorText?: string;
  groupTitle?: OptionGroupTitle1;
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
