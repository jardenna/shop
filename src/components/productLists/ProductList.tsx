import { ReactNode } from 'react';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';

type ProductListProps = {
  ariaId: string;
  children: ReactNode;
  errorText?: string;
  optionGroupTitle?: string;
};

const ProductList = ({
  children,
  errorText,
  optionGroupTitle,
  ariaId,
}: ProductListProps) => (
  <div>
    {optionGroupTitle && (
      <OptionGroupTitle
        errorText={errorText}
        text={optionGroupTitle}
        id={ariaId}
      />
    )}
    <ul className="product-size-list" id={ariaId}>
      {children}
    </ul>
  </div>
);

export default ProductList;
