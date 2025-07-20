import { ReactNode } from 'react';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';

type ProductSizeListProps = {
  ariaId: string;
  children: ReactNode;
  errorText?: string;
  optionGroupTitle?: string;
};

const ProductSizeList = ({
  children,
  errorText,
  optionGroupTitle,
  ariaId,
}: ProductSizeListProps) => (
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

export default ProductSizeList;
