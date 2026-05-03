import { useCurrency } from '../../../features/currency/useCurrency';
import { useLanguage } from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { InputChangeHandler, InputType } from '../../../types/types';
import Input from '../../formElements/Input';
import RadioButtonList from '../../formElements/RadioButtonList';
import Icon from '../../icons/Icon';
import Popup from '../../popup/Popup';
import VisuallyHidden from '../../VisuallyHidden';
import './_table-filters.scss';
import TableFilterInput from './TableFilterInput';
import {
  getListByName,
  getMinMaxKeys,
  InitialTableFilters,
  ListsMap,
} from './tableFiltersUtils';

export interface BaseTableFilterProps {
  filterType: InputType;
  id: string;
  name: string;
  onFilter: InputChangeHandler;
  value: string;
}

interface TableFilterPopupProps<T> extends BaseTableFilterProps {
  id: string;
  values: InitialTableFilters<T>;
  className?: string;
}

const TableFilterPopup = <T,>({
  id,
  value,
  onFilter,
  filterType,
  name,
  values,
  className,
}: TableFilterPopupProps<T>) => {
  const { language } = useLanguage();
  const { currencyText } = useCurrency();
  const { minKey, maxKey } = getMinMaxKeys(name);
  const labelText = `${language.filter} ${language[id]}`;
  const labelTextShort = language[id];
  const inputSuffix = id !== 'countInStock' ? currencyText : language.pcs;

  // Centralized check for active filter state
  const isFilterActive = (() => {
    if (filterType === 'number') {
      return Boolean(values[minKey] || values[maxKey]);
    }

    return Boolean(value);
  })();

  const getPopupContent = () => {
    switch (filterType) {
      case 'text':
      case 'date':
        return (
          <TableFilterInput
            name={name}
            id={id}
            onFilter={onFilter}
            value={value}
            filterType={filterType}
            labelText={labelText}
          />
        );

      case 'number':
        return (
          <form className="table-filter-form">
            <Input
              id={minKey}
              type="number"
              inputMode="numeric"
              name={minKey}
              labelText={`${labelTextShort} ${language.from}`}
              value={values[minKey]}
              onChange={onFilter}
              autoFocus
              inputSuffix={inputSuffix}
            />
            <Input
              id={maxKey}
              name={maxKey}
              type="number"
              inputMode="numeric"
              labelText={`${labelTextShort} ${language.to}`}
              value={values[maxKey]}
              onChange={onFilter}
              inputSuffix={inputSuffix}
            />
          </form>
        );

      case 'radio':
        return (
          <form>
            <RadioButtonList
              radioButtonList={getListByName(name as keyof ListsMap)}
              name={name}
              onChange={onFilter}
              initialChecked={value}
            />
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <Popup
      placement="bottom-start"
      popupContent={getPopupContent}
      ariaLabel={`${language.filter} ${id}`}
      className={className}
    >
      <Icon iconName={IconName.Filter} />

      {isFilterActive && (
        <>
          <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
          <span className="dot" aria-hidden />
        </>
      )}
    </Popup>
  );
};

export default TableFilterPopup;
