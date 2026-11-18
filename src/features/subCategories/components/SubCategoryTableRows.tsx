import { useLocation } from 'react-router';
import type { Status } from '../../../app/api/apiTypes/adminApiTypes';
import AdminBadge from '../../../components/adminCart/AdminBadge';
import MoreLink from '../../../components/MoreLink';
import { AdminPath } from '../../../layout/nav/enums';

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
}: SubCategoryTableRowsProps) => {
  const location = useLocation();

  return (
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
          state={{
            returnTo: `${location.pathname}${location.search}`,
          }}
        />
      </td>
    </tr>
  );
};

export default SubCategoryTableRows;
