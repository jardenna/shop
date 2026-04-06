import { useLanguage } from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import type { InputChangeHandler, InputType } from '../../types/types';
import Icon from '../icons/Icon';
import Popup from '../popup/Popup';
import VisuallyHidden from '../VisuallyHidden';
import TableSearchInput from './TableSearchInput';

export interface BaseTableSearchProps {
  name: string;
  onFilterRows: InputChangeHandler;
  searchType: InputType;
  title: string;
  value: any;
}

interface TableSearchProps extends BaseTableSearchProps {
  label: string;
}

const TableSearch = ({
  title,
  value,
  onFilterRows,
  label,
  searchType,
  name,
}: TableSearchProps) => {
  const { language } = useLanguage();

  return (
    <div className="table-search-input">
      <Popup
        placement="bottom-start"
        popupContent={
          <TableSearchInput
            name={name}
            title={title}
            onFilterRows={onFilterRows}
            value={value}
            searchType={searchType}
          />
        }
        ariaLabel={`${language.filter} ${label}`}
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
