import { memo } from 'react';
import type { Status } from '../../../app/api/apiTypes/adminApiTypes';
import MoreLink from '../../../components/MoreLink';
import { AdminPath } from '../../../layout/nav/enums';
import AdminBadge from '../../products/components/AdminBadge';

type SubCategoryTableRowsProps = {
  id: string;
  linkText: string;
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
  linkText,
}: SubCategoryTableRowsProps) => (
  <tr>
    <td>{mainCategoryName}</td>
    <td>{subCategoryName}</td>
    <td>
      <AdminBadge status={status} scheduledDate={scheduledDate || null} />
    </td>
    <td>
      <MoreLink
        linkText={linkText}
        linkTo={`${AdminPath.AdminSubCategoryView}/${id}`}
      />
    </td>
  </tr>
);

export default memo(SubCategoryTableRows);
