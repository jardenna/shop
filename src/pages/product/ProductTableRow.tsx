import { Status } from '../../app/api/apiTypes';
import CardBadge from '../../components/card/CardBadge';
import Img from '../../components/Img';
import MoreLink from '../../components/MoreLink';
import ProductPrice from '../../features/currency/components/ProductPrice';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';

export type SubCategoryTableRowProps = {
  categoryName: string;
  countInStock: number;
  id: string;
  imageSrc: string;
  price: number;
  productName: string;
  productStatus: Status;
  scheduledDate: Date | null;
  subCategoryName: string;
};

const ProductTableRow = ({
  id,
  productName,
  imageSrc,
  price,
  subCategoryName,
  categoryName,
  countInStock,
  productStatus,
  scheduledDate,
}: SubCategoryTableRowProps) => {
  const { language } = useLanguage();
  return (
    <tr>
      <td>
        <div className="product-overview-cell">
          <Img src={imageSrc} alt="" />
          <span className="product-name">{productName}</span>
        </div>
      </td>
      <td>
        {subCategoryName} / {categoryName}
      </td>
      <td>
        <ProductPrice price={price} />
      </td>
      <td>{countInStock}</td>
      <td>
        <CardBadge
          badgeClassName={productStatus.toLowerCase()}
          badgeText={language[productStatus.toLocaleLowerCase()]}
          scheduledDate={scheduledDate || null}
        />
      </td>
      <td>
        <MoreLink
          linkText={language.viewProduct}
          linkTo={`/admin/${MainPath.AdminProductView}/${id}`}
        />
      </td>
    </tr>
  );
};

export default ProductTableRow;
