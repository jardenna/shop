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
  id: string;
  name: string;
  onFilterRows: InputChangeHandler;
  value: string;
}

interface TableFilterPopupProps extends BaseTableFilterProps {
  id: string;
  values: InitialTableFilters;
}

const TableFilterPopup = ({
  id,
  value,
  onFilterRows,
  filterType,
  name,
  values,
}: TableFilterPopupProps) => {
  const { language } = useLanguage();
  const { minKey, maxKey } = getMinMaxKeys(name);
  const legendText = `${language.filter} ${language[id]}`;
  const labelText = `${language.filter} ${language[id]}`;
  const labelTextShort = language[id];

  const getPopupContent = () => {
    switch (filterType) {
      case 'text':
        return (
          <TableFilterInput
            name={name}
            id={id}
            onFilterRows={onFilterRows}
            value={value}
            filterType={filterType}
            legendText={legendText}
            labelText={labelText}
          />
        );

      case 'number':
        return (
          <form className="table-filter-form">
            <FieldSet legendText={legendText}>
              <Input
                id={minKey}
                type="number"
                inputMode="numeric"
                name={minKey}
                labelText={`${labelTextShort} ${language.from}`}
                value={values[minKey] as string}
                onChange={onFilterRows}
              />
              <Input
                id={maxKey}
                name={maxKey}
                type="number"
                inputMode="numeric"
                labelText={`${labelTextShort} ${language.to}`}
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
            id={id}
            onFilterRows={onFilterRows}
            value={value}
            filterType={filterType}
            legendText={legendText}
            labelText={labelText}
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
        ariaLabel={`${language.filter} ${id}`}
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
