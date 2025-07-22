import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { sizeList } from '../../utils/productLists';
import VisuallyHidden from '../VisuallyHidden';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListReadOnlyProps = {
  sizes: ProductSizes[];
  optionGroupTitle?: string;
};

const SizeListReadOnly = ({
  sizes,
  optionGroupTitle,
}: SizeListReadOnlyProps) => {
  const { language } = useLanguage();

  console.log(sizes);

  return (
    <ProductList ariaId="sizes" optionGroupTitle={optionGroupTitle}>
      {sizeList.map((size) => (
        <ProductListItem
          as="span"
          text={size}
          className={sizes.includes(size) ? '' : 'text-line-through'}
          key={size}
        >
          <VisuallyHidden>
            {!sizes.includes(size) ? language.unavailable : language.available}{' '}
            {language.size}
          </VisuallyHidden>
        </ProductListItem>
      ))}
    </ProductList>
  );
};

export default SizeListReadOnly;
