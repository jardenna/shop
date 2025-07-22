import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';
import type { ChangeInputType } from '../../types/types';
import Icon from '../icons/Icon';
import Tooltip from '../tooltip/Tooltip';
import VisuallyHidden from '../VisuallyHidden';
import TableSearchInput from './TableSearchInput';

type TableSearchProps = {
  label: string;
  title: string;
  value: string;
  onFilterRows: (event: ChangeInputType) => void;
};

const TableSearch = ({
  title,
  value,
  onFilterRows,
  label,
}: TableSearchProps) => {
  const { language } = useLanguage();

  return (
    <div className="table-search-input">
      <Tooltip
        placement="bottom-start"
        ariaControls="filter"
        tooltip={
          <TableSearchInput
            title={title}
            onFilterRows={onFilterRows}
            value={value}
          />
        }
        triggerBtnVariant={BtnVariant.Ghost}
        ariaLabel={`${language.filter} ${label}`}
      >
        <Icon title={language.filterRow} iconName={IconName.Filter} />

        {value && (
          <>
            <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
            <span className="dot" aria-hidden />
          </>
        )}
      </Tooltip>
    </div>
  );
};

export default TableSearch;
