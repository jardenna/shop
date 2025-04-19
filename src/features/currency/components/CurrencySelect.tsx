import Selectbox from '../../../components/selectbox/Selectbox';
import { HeaderProps } from '../../../layout/header/Header';

type OmittedHeaderProps = Omit<
  HeaderProps,
  | 'primaryActionBtn'
  | 'secondaryActionBtn'
  | 'ariaLabel'
  | 'userDropdownList'
  | 'values'
  | 'onChange'
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
