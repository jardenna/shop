import { memo } from 'react';
import type { Status } from '../../../app/api/apiTypes/adminApiTypes';
import DateDisplay from '../../../components/datePicker/DateDisplay';
import MoreLink from '../../../components/MoreLink';
import { AdminPath } from '../../../layout/nav/enums';
import AdminBadge from '../../products/components/AdminBadge';

type CategoryTableRowProps = {
  categoryName: string;
  createdAt: Date;
  id: string;
  linkText: string;
  scheduledDate: Date | null;
  status: Status;
};

const CategoryTableRow = ({
  id,
  scheduledDate,
  categoryName,
  createdAt,
  status,
  linkText,
}: CategoryTableRowProps) => (
  <tr>
    <td>{categoryName}</td>
    <td>
      <AdminBadge status={status} scheduledDate={scheduledDate || null} />
    </td>
    <td>
      <DateDisplay date={createdAt} />
    </td>
    <td>
      <MoreLink
        linkText={linkText}
        linkTo={`${AdminPath.AdminCategoryUpdate}/${id}`}
      />
    </td>
  </tr>
);

export default memo(CategoryTableRow);
