import { memo } from 'react';
import { Status } from '../../app/api/apiTypes';
import CardBadge from '../../components/card/CardBadge';
import MoreLink from '../../components/MoreLink';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';

type SubCategoryTableRowsProps = {
  id: string;
  mainCategoryName: string;
  productCount: number;
  scheduledDate: Date | null;
  status: Status;
  subCategoryName: string;
};

const SubCategoryTableRows = ({
  id,
  scheduledDate,
  subCategoryName,
  status,
  productCount,
  mainCategoryName,
}: SubCategoryTableRowsProps) => {
  const { language } = useLanguage();
  return (
    <tr>
      <td>{mainCategoryName}</td>
      <td>{subCategoryName}</td>
      <td>{productCount}</td>
      <td>
        <CardBadge
          badgeClassName={status.toLowerCase()}
          badgeText={language[status.toLocaleLowerCase()]}
          scheduledDate={scheduledDate || null}
        />
      </td>
      <td>
        <MoreLink
          linkText={language.viewCategory}
          linkTo={`/admin/${MainPath.AdminSubCategoryView}/${id}`}
        />
      </td>
    </tr>
  );
};

export default memo(SubCategoryTableRows);
