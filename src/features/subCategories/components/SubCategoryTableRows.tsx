import type { Status } from '../../../app/api/apiTypes/adminApiTypes';
import MoreLink from '../../../components/MoreLink';
import { AdminPath } from '../../../layout/nav/enums';
import AdminBadge from '../../products/components/AdminBadge';

type SubCategoryTableRowsProps = {
  categoryName: string;
  id: string;
  linkText: string;
  scheduledDate: Date | null;
  status: Status;
  subCategoryName: string;
};

const SubCategoryTableRows = ({
  id,
  scheduledDate,
  subCategoryName,
  status,
  categoryName,
  linkText,
}: SubCategoryTableRowsProps) => (
  <tr>
    <td>{categoryName}</td>
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

export default SubCategoryTableRows;
