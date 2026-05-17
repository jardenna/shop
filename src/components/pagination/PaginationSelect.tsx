import { useLocation } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Options } from '../../types/types';
import FieldSet from '../fieldset/FieldSet';
import Selectbox from '../selectbox/Selectbox';

export type PaginationSelectProps = {
  defaultValue: Options;
  totalCount: number;
  optionList?: string[];
  onSelectCount: (option: Options) => void;
};

const PaginationSelect = ({
  defaultValue,
  onSelectCount,
  optionList,
  totalCount,
}: PaginationSelectProps) => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const { isTabletSize } = useMediaQuery();
  const selectProductCountList = optionList || ['8', '16', '32'];

  const options = [
    ...selectProductCountList.map((count) => ({
      value: count,
      label: count,
    })),
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
      {!isTabletSize && <p>{language.productPerPage}</p>}
    </form>
  );
};

export default PaginationSelect;
