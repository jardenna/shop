import { useLocation } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { Options } from '../../types/types';
import FieldSet from '../fieldset/FieldSet';
import Selectbox from '../selectbox/Selectbox';

export type PaginationSelectProps = {
  defaultValue: Options;
  optionList: string[];
  totalCount: number;
  selectInfo?: string;
  onSelectCount: (option: Options) => void;
};

const PaginationSelect = ({
  defaultValue,
  onSelectCount,
  selectInfo,
  optionList,
  totalCount,
}: PaginationSelectProps) => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  const options = [
    ...optionList.map((count) => ({
      value: count,
      label: count,
    })),
    { value: totalCount.toString(), label: language.all },
  ];

  // Check when filtering
  const isOptionDisabled = (option: { value: string }) =>
    Number(option.value) > totalCount;

  return (
    <form className="pagination-select">
      <FieldSet legendText={language.displayOptions}>
        <Selectbox
          selectKey={`perpage-${pathname}`}
          name="productCount"
          options={options}
          id="productCount"
          onChange={onSelectCount}
          labelText={language.selectNumber}
          defaultValue={defaultValue}
          inputHasNoLabel
          isOptionDisabled={isOptionDisabled}
        />
      </FieldSet>
      {selectInfo && <p>{selectInfo}</p>}
    </form>
  );
};

export default PaginationSelect;
