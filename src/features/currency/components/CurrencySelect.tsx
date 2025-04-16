import { FC } from 'react';

import Selectbox from '../../../components/customSelectbox/Selectbox';
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

interface CurrencySelectProps extends OmittedHeaderProps {
  inputHasNoLabel: boolean;
  labelText: string;
}
const CurrencySelect: FC<CurrencySelectProps> = ({
  currencyOptions,
  defaultValue,
  onSelectCurrency,
  labelText,
}) => (
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
