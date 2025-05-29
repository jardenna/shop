import { memo } from 'react';
import { Status } from '../../app/api/apiTypes';
import Badge from '../../components/badge/Badge';
import MoreLink from '../../components/MoreLink';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';

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
        <Badge
          badgeClassName={status.toLowerCase()}
          badgeText={getlowerCaseFirstLetter(status, language)}
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
