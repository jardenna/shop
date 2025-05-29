import { memo } from 'react';
import { Status } from '../../app/api/apiTypes';
import ScheduledDateBadge from '../../components/badge/ScheduledDateBadge';
import DateDisplay from '../../components/datePicker/DateDisplay';
import MoreLink from '../../components/MoreLink';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';

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
        <ScheduledDateBadge
          badgeClassName={status.toLowerCase()}
          badgeText={getlowerCaseFirstLetter(status, language)}
          scheduledDate={scheduledDate || null}
        />
      </td>
      <td>
        <DateDisplay date={createdAt} />
      </td>
      <td>
        <MoreLink
          linkText={language.update}
          linkTo={`/admin/${MainPath.AdminCategoryUpdate}/${id}`}
        />
      </td>
    </tr>
  );
};

export default memo(CategoryTableRow);
