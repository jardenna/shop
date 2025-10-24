import Selectbox from '../../../components/selectbox/Selectbox';
import type { HeaderProps } from '../../../layout/header/Header';
import type { OmitChecked } from '../../../types/types';

type OmittedHeaderProps = OmitChecked<
  HeaderProps,
  | 'primaryActionBtn'
  | 'secondaryActionBtn'
  | 'dropdownBtnList'
  | 'values'
  | 'onChange'
  | 'isMobileSize'
>;

type CurrencySelectProps = OmittedHeaderProps & {
  inputHasNoLabel: boolean;
  labelText: string;
};
const CurrencySelect = ({
  currencyOptions,
  defaultValue,
  onSelectCurrency,
  labelText,
}: CurrencySelectProps) => (
  <Selectbox
    id="currency"
    defaultValue={defaultValue}
    options={currencyOptions}
    onChange={onSelectCurrency}
    name="currency"
    labelText={labelText}
    inputHasNoLabel
  />
);
export default CurrencySelect;
