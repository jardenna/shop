import { memo } from 'react';
import { Status } from '../../app/api/apiTypes';
import CardBadge from '../../components/card/CardBadge';
import IconBtn from '../../components/IconBtn';
import MoreLink from '../../components/MoreLink';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { IconName } from '../../types/enums';
import { formatNumber, getlowerCaseFirstLetter } from '../../utils/utils';
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
        />{' '}
        I{' '}
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
