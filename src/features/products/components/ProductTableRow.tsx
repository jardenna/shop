import { Status } from '../../../app/api/apiTypes/adminApiTypes';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import AdminBadge from './AdminBadge';
import ProductActions from './ProductActions';
import ProductOverviewCell from './ProductOverviewCell';

interface ProductTableRowProps {
  categoryName: string;
  countInStock: number;
  discount: number;
  discountedPrice: number;
  id: string;
  images: string[];
  price: number;
  productName: string;
  scheduledDate: Date | null;
  status: Status;
  subCategoryName: string;
  onCopyProduct: (id: string) => void;
}

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
  price,
  discount,
  discountedPrice,
}: ProductTableRowProps) => (
  <tr>
    <td>
      <ProductOverviewCell productName={productName} images={images} id={id} />
    </td>
    <td>{categoryName}</td>
    <td>{subCategoryName}</td>
    <td>{countInStock}</td>
    <td>
      <ProductPrice price={price} />
    </td>
    <td>{discount} %</td>
    <td>
      <ProductPrice price={discountedPrice} />
    </td>
    <td>
      <AdminBadge status={status} scheduledDate={scheduledDate || null} />
    </td>
    <td>
      <ProductActions id={id} onCopyProduct={onCopyProduct} />
    </td>
  </tr>
);

export default ProductTableRow;
