import { useLanguage } from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { InputChangeHandler, InputType } from '../../../types/types';
import Input from '../../formElements/Input';
import Icon from '../../icons/Icon';
import Popup from '../../popup/Popup';
import VisuallyHidden from '../../VisuallyHidden';
import './_table-filters.scss';
import { getMinMaxKeys } from './initTableFilters';
import TableFilterInput from './TableFilterInput';

export interface BaseTableFilterProps {
  filterType: InputType;
  name: string;
  onFilterRows: InputChangeHandler;
  title: string;
  value: any;
}

interface TableFilterPopupProps extends BaseTableFilterProps {
  label: string;
  values: any;
}

const TableFilterPopup = ({
  title,
  value,
  onFilterRows,
  label,
  filterType,
  name,
  values,
}: TableFilterPopupProps) => {
  const { language } = useLanguage();

  const getPopupContent = () => {
    switch (filterType) {
      case 'text':
        return (
          <TableFilterInput
            name={name}
            title={title}
            onFilterRows={onFilterRows}
            value={value}
            filterType={filterType}
          />
        );

      case 'number':
        return (
          <section>
            <Input
              id={minKey}
              name={minKey}
              labelText={`${label} ${language.from}`}
              value={values[minKey]}
              onChange={onFilterRows}
            />
            <Input
              id={maxKey}
              name={maxKey}
              labelText={`${label} ${language.to}`}
              value={values[maxKey]}
              onChange={onFilterRows}
            />
          </section>
        );

      case 'radio':
        return (
          <TableFilterInput
            name={name}
            title={title}
            onFilterRows={onFilterRows}
            value={value}
            filterType={filterType}
          />
        );

      default:
        return null;
    }
  };

  const { minKey, maxKey } = getMinMaxKeys(name);

  return (
    <div className="table-filter-popup">
      <Popup
        placement="bottom-start"
        popupContent={getPopupContent}
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

export default TableFilterPopup;
