import { memo } from 'react';
import { Status } from '../../../app/api/apiTypes/adminApiTypes';
import { useAppSelector } from '../../../app/hooks';
import Badge from '../../../components/badge/Badge';
import { selectSelectedLanguage } from '../../language/languageSlice';
import ProductActions from './ProductActions';
import ProductOverviewCell from './ProductOverviewCell';
import { numberConvert } from '../../../utils/numberConverter';

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
  const selectedLanguage = useAppSelector(selectSelectedLanguage);

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
      <td>{numberConvert(countInStock, selectedLanguage)}</td>
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
