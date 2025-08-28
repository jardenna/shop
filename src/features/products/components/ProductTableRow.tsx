import { memo } from 'react';
import { Status } from '../../../app/api/apiTypes/adminApiTypes';
import Badge from '../../../components/badge/Badge';
import { formatNumber } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';
import ProductActions from './ProductActions';
import ProductOverviewCell from './ProductOverviewCell';

type ProductTableRowProps = {
  categoryName: string;
  countInStock: number;
  id: string;
  images: string[];
  productName: string;
  scheduledDate: Date | null;
  status: Status;
  subCategoryName: string;
  onCopyProduct: (id: string) => void;
};

const ProductTableRow = ({
  id,
  productName,
  images,
  subCategoryName,
  categoryName,
  countInStock,
  status,
  scheduledDate,
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
        {subCategoryName}
        <span className="text-small text-italic"> ({categoryName})</span>
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
