import { ElementType, HTMLAttributes } from 'react';

type ProductSizeTextProps = HTMLAttributes<HTMLElement> & {
  text: string;
  as?: ElementType;
  htmlFor?: string;
};

const ProductSizeText = ({
  as: Tag = 'label',
  text,
  ...props
}: ProductSizeTextProps) => (
  <Tag className="product-size" {...props}>
    {text}
  </Tag>
);

export default ProductSizeText;
