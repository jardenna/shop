import { memo } from 'react';
import type { Status } from '../../../app/api/apiTypes/adminApiTypes';
import MoreLink from '../../../components/MoreLink';
import { AdminPath } from '../../../layout/nav/enums';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';
import AdminBadge from '../../products/components/AdminBadge';

type SubCategoryTableRowsProps = {
  id: string;
  mainCategoryName: string;
  scheduledDate: Date | null;
  status: Status;
  subCategoryName: string;
  translationKey: string;
};

const SubCategoryTableRows = ({
  id,
  scheduledDate,
  subCategoryName,
  status,
  translationKey,
  mainCategoryName,
}: SubCategoryTableRowsProps) => {
  const { language } = useLanguage();

  return (
    <tr>
      <td>
        {getlowerCaseFirstLetter(mainCategoryName, language) ||
          mainCategoryName}
      </td>
      <td>{language[translationKey] || subCategoryName}</td>
      <td>
        <AdminBadge status={status} scheduledDate={scheduledDate || null} />
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
