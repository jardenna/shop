import { memo } from 'react';
import { Status } from '../../app/api/apiTypes';
import ScheduledDateBadge from '../../components/card/ScheduledDateBadge';
import useLanguage from '../../features/language/useLanguage';
import { formatNumber, getlowerCaseFirstLetter } from '../../utils/utils';
import ProductActions from './ProductActions';
import ProductDiscountPrice from './ProductDiscountPrice';
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
  const { language, selectedLanguage } = useLanguage();

  return (
    <tr>
      <td>
        <ProductOverviewCell productName={productName} images={images} />
      </td>
      <td>
        {subCategoryName} / {categoryName}
      </td>
      <td>
        <ProductDiscountPrice price={price} discount={discount || null} />
      </td>
      <td>{formatNumber(countInStock, selectedLanguage)}</td>
      <td>
        <ScheduledDateBadge
          badgeClassName={status.toLowerCase()}
          badgeText={getlowerCaseFirstLetter(status, language)}
          scheduledDate={scheduledDate || null}
        />
      </td>
      <td>
        <ProductActions id={id} onCopyProduct={onCopyProduct} />
      </td>
    </tr>
  );
};

export default memo(ProductTableRow);
