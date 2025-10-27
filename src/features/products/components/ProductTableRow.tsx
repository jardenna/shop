import { Status } from '../../../app/api/apiTypes/adminApiTypes';
import { useAppSelector } from '../../../app/hooks';
import { numberConvert } from '../../../utils/numberConverter';
import { selectSelectedLanguage } from '../../language/languageSlice';
import AdminBadge from './AdminBadge';
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
        <AdminBadge status={status} scheduledDate={scheduledDate || null} />
      </td>
      <td>
        <ProductActions id={id} onCopyProduct={onCopyProduct} />
      </td>
    </tr>
  );
};

export default ProductTableRow;
