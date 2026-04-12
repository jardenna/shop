import { useLanguage } from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { InputChangeHandler, InputType } from '../../../types/types';
import FieldSet from '../../fieldset/FieldSet';
import Input from '../../formElements/Input';
import Icon from '../../icons/Icon';
import Popup from '../../popup/Popup';
import VisuallyHidden from '../../VisuallyHidden';
import './_table-filters.scss';
import TableFilterInput from './TableFilterInput';
import { getMinMaxKeys, InitialTableFilters } from './tableFiltersUtils';

export interface BaseTableFilterProps {
  filterType: InputType;
  name: string;
  onFilterRows: InputChangeHandler;
  title: string;
  value: string;
}

interface TableFilterPopupProps extends BaseTableFilterProps {
  label: string;
  values: InitialTableFilters;
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
  const { minKey, maxKey } = getMinMaxKeys(name);
  const text = `${language.filter} ${language[title]}`;

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
          <form className="table-filter-form">
            <FieldSet legendText={text}>
              <Input
                id={minKey}
                type="number"
                inputMode="numeric"
                name={minKey}
                labelText={`${label} ${language.from}`}
                value={values[minKey] as string}
                onChange={onFilterRows}
              />
              <Input
                id={maxKey}
                name={maxKey}
                type="number"
                inputMode="numeric"
                labelText={`${label} ${language.to}`}
                value={values[maxKey] as string}
                onChange={onFilterRows}
              />
            </FieldSet>
          </form>
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
