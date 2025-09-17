import { memo } from 'react';
import type { Status } from '../../../app/api/apiTypes/adminApiTypes';
import DateDisplay from '../../../components/datePicker/DateDisplay';
import MoreLink from '../../../components/MoreLink';
import { AdminPath } from '../../../layout/nav/enums';
import useLanguage from '../../language/useLanguage';
import AdminBadge from '../../products/components/AdminBadge';

type CategoryTableRowProps = {
  categoryName: string;
  createdAt: Date;
  id: string;
  scheduledDate: Date | null;
  status: Status;
};

const CategoryTableRow = ({
  id,
  scheduledDate,
  categoryName,
  createdAt,
  status,
}: CategoryTableRowProps) => {
  const { language } = useLanguage();
  return (
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
          linkText={language.update}
          linkTo={`${AdminPath.AdminCategoryUpdate}/${id}`}
        />
      </td>
    </tr>
  );
};

export default memo(CategoryTableRow);
