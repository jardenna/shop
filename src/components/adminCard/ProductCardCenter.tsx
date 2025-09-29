import type {
  MainCategoryNames,
  Size,
  SubCategoryNames,
} from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import CardContent from '../card/CardContent';
import LabelValueGrid from '../LabelValueGrid';
import ColorList from '../productLists/ColorList';
import SizeList from '../productLists/SizeList';

type ProductCardCenterProps = {
  availableSizeList: Size[];
  brand: string;
  categoryName: MainCategoryNames;
  colours: string[];
  countInStock: number;
  discount: number;
  material: string;
  price: number;
  subCategoryName: SubCategoryNames;
  onReset: () => void;
};

const ProductCardCenter = ({
  brand,
  colours,
  discount,
  material,
  availableSizeList,
  onReset,
  countInStock,
  categoryName,
  subCategoryName,
}: ProductCardCenterProps) => {
  const { language } = useLanguage();

  return (
    <CardContent onReset={onReset} className="center">
      <span className="separator" aria-hidden={true} />
      <LabelValueGrid text={language.productsInStock}>
        {countInStock} {language.pcs}
      </LabelValueGrid>
      {discount !== 0 && (
        <LabelValueGrid text={language.discount}>{discount}%</LabelValueGrid>
      )}
      <LabelValueGrid text={language.brand}>{brand}</LabelValueGrid>
      <LabelValueGrid text={language.material}>{material}</LabelValueGrid>
      <ColorList
        colors={colours}
        variant="small"
        groupTitle={{
          title: language.colours,
          id: 'view-product-colors',
        }}
      />
      <SizeList
        availableSizeList={availableSizeList}
        categoryName={categoryName}
        subCategoryName={subCategoryName}
        groupTitle={{
          title: language.sizes,
          id: 'view-product-sizes',
        }}
      />
    </CardContent>
  );
};

export default ProductCardCenter;
