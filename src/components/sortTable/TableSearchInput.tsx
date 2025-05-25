import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import IconBtn from '../IconBtn';
import Tooltip from '../tooltip/Tooltip';
import VisuallyHidden from '../VisuallyHidden';
import TableSearch from './TableSearch';

type TableSearchInputProps = {
  label: string;
  title: string;
  value: string;
  onFilterRows: (event: ChangeInputType) => void;
};

const TableSearchInput = ({
  title,
  value,
  onFilterRows,
  label,
}: TableSearchInputProps) => {
  const { language } = useLanguage();

  return (
    <div className="table-search-input">
      <Tooltip
        placement="top-start"
        ariaControls="filter"
        tooltip={
          <TableSearch
            title={title}
            onFilterRows={onFilterRows}
            value={value}
          />
        }
        triggerBtnVariant={BtnVariant.Ghost}
        triggerBtnClassName="danger"
        ariaLabel={language.deleteUser}
      >
        <IconBtn
          title={language.filterRow}
          ariaLabel={`${language.filter} ${label}`}
          iconName={IconName.Filter}
        />{' '}
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

export default TableSearchInput;
