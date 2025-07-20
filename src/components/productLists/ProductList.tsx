import { ReactNode } from 'react';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';
import './_product-list.scss';

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
    <ul className="product-list" id={ariaId}>
      {children}
    </ul>
  </div>
);

export default ProductList;
