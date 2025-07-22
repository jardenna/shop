import { ReactNode } from 'react';
import OptionGroupTitle, { OptionGroupTitle1 } from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  ariaId: string;
  children: ReactNode;
  errorText?: string;
  groupTitle?: OptionGroupTitle1;
  optionGroupTitle?: string;
};

const ProductList = ({ children, errorText, groupTitle }: ProductListProps) => (
  <div>
    {groupTitle && (
      <OptionGroupTitle
        errorText={errorText}
        text={groupTitle.title}
        groupTitle={groupTitle}
      />
    )}

    <ul className="product-list" id={groupTitle?.id}>
      {children}
    </ul>
  </div>
);

export default ProductList;
