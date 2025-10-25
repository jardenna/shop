import Selectbox from '../../../components/selectbox/Selectbox';
import type { BaseHeaderProps } from '../../../layout/header/Header';

type PickedHeaderProps = Pick<
  BaseHeaderProps,
  'currencyOptions' | 'defaultValue' | 'onSelectCurrency'
>;

type CurrencySelectProps = PickedHeaderProps & {
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
