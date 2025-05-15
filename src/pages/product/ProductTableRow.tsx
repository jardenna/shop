import { memo } from 'react';
import { Status } from '../../app/api/apiTypes';
import CardBadge from '../../components/card/CardBadge';
import IconBtn from '../../components/IconBtn';
import Img from '../../components/Img';
import MoreLink from '../../components/MoreLink';
import ProductPrice from '../../features/currency/components/ProductPrice';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { IconName } from '../../types/enums';
import {
  discountCalculation,
  formatNumber,
  getlowerCaseFirstLetter,
} from '../../utils/utils';

type ProductTableRowProps = {
  categoryName: string;
  countInStock: number;
  id: string;
  imageSrc: string[];
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
  imageSrc,
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

  const productHasDiscount = discount && discount > 0;
  return (
    <tr>
      <td>
        <div className="product-overview-cell">
          <Img src={imageSrc[0]} alt="" />
          <span className="product-name">{productName}</span>
        </div>
      </td>
      <td>
        {subCategoryName} / {categoryName}
      </td>
      <td>
        <ProductPrice
          price={price}
          className={productHasDiscount ? 'text-line-through' : ''}
        />
        {productHasDiscount ? (
          <span>
            {' '}
            / <ProductPrice price={discountCalculation(price, discount)} />
          </span>
        ) : (
          ''
        )}
      </td>
      <td>{formatNumber(countInStock, selectedLanguage)}</td>
      <td>
        <CardBadge
          badgeClassName={status.toLowerCase()}
          badgeText={getlowerCaseFirstLetter(status, language)}
          scheduledDate={scheduledDate || null}
        />
      </td>
      <td>
        <MoreLink
          linkText={language.viewProduct}
          linkTo={`/admin/${MainPath.AdminProductView}/${id}`}
        />
      </td>
      <td>
        <IconBtn
          title={language.filterRow}
          ariaLabel="copy"
          onClick={() => {
            onCopyProduct(id);
          }}
          iconName={IconName.Dublicate}
        />
      </td>
    </tr>
  );
};

export default memo(ProductTableRow);
