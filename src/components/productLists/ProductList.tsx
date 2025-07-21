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

const ProductList = ({
  children,
  errorText,
  optionGroupTitle,
  ariaId,
  groupTitle,
}: ProductListProps) => (
  <div>
    {optionGroupTitle && (
      <OptionGroupTitle
        errorText={errorText}
        text={optionGroupTitle}
        id={ariaId}
        groupTitle={groupTitle}
      />
    )}
    <ul className="product-list" id={ariaId}>
      {children}
    </ul>
  </div>
);

export default ProductList;
