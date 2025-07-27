import { memo } from 'react';
import type { Status } from '../../../app/api/apiTypes/adminApiTypes';
import Badge from '../../../components/badge/Badge';
import MoreLink from '../../../components/MoreLink';
import { AdminPath } from '../../../layout/nav/enums';
import useLanguage from '../../language/useLanguage';

type SubCategoryTableRowsProps = {
  id: string;
  mainCategoryName: string;
  scheduledDate: Date | null;
  status: Status;
  subCategoryName: string;
};

const SubCategoryTableRows = ({
  id,
  scheduledDate,
  subCategoryName,
  status,
  mainCategoryName,
}: SubCategoryTableRowsProps) => {
  const { language } = useLanguage();

  return (
    <tr>
      <td>{mainCategoryName}</td>
      <td>{subCategoryName}</td>
      <td>
        <Badge status={status} scheduledDate={scheduledDate || null} />
      </td>
      <td>
        <MoreLink
          linkText={language.viewCategory}
          linkTo={`${AdminPath.AdminSubCategoryView}/${id}`}
        />
      </td>
    </tr>
  );
};

export default memo(SubCategoryTableRows);
