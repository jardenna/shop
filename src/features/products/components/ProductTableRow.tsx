import { memo } from 'react';
import { Status } from '../../../app/api/apiTypes/adminApiTypes';
import Badge from '../../../components/badge/Badge';
import { formatNumber } from '../../../utils/utils';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';
import useLanguage from '../../language/useLanguage';
import ProductActions from './ProductActions';
import ProductOverviewCell from './ProductOverviewCell';

type ProductTableRowProps = {
  categoryName: string;
  countInStock: number;
  id: string;
  images: string[];
  price: number;
  productName: string;
  scheduledDate: Date | null;
  status: Status;
  subCategoryName: string;
  discount?: number;
  onCopyProduct: (id: string) => void;
};

const ProductTableRow = ({
  id,
  productName,
  images,
  price,
  subCategoryName,
  categoryName,
  countInStock,
  status,
  scheduledDate,
  discount,
  onCopyProduct,
}: ProductTableRowProps) => {
  const { selectedLanguage } = useLanguage();

  return (
    <tr>
      <td>
        <ProductOverviewCell
          productName={productName}
          images={images}
          id={id}
        />
      </td>
      <td>
        {subCategoryName} / {categoryName}
      </td>
      <td>
        <ProductDiscountPrice price={price} discount={discount || 0} />
      </td>
      <td>{formatNumber(countInStock, selectedLanguage)}</td>
      <td>
        <Badge status={status} scheduledDate={scheduledDate || null} />
      </td>
      <td>
        <ProductActions id={id} onCopyProduct={onCopyProduct} />
      </td>
    </tr>
  );
};

export default memo(ProductTableRow);
