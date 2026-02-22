import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import type { InputChangeHandler } from '../../types/types';
import Icon from '../icons/Icon';
import Popup from '../popup/Popup';
import VisuallyHidden from '../VisuallyHidden';
import TableSearchInput from './TableSearchInput';

type TableSearchProps = {
  label: string;
  onFilterRows: InputChangeHandler;
  title: string;
  value: string;
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
      <Popup
        placement="bottom-start"
        popupContent={
          <TableSearchInput
            title={title}
            onFilterRows={onFilterRows}
            value={value}
          />
        }
        ariaLabel={`${language.filter} ${label}`}
        ariaHasPopup="dialog"
      >
        <Icon iconName={IconName.Filter} />

        {value && (
          <>
            <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
            <span className="dot" aria-hidden />
          </>
        )}
      </Popup>
    </div>
  );
};

export default TableSearch;
