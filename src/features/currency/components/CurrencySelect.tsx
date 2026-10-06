import Selectbox from '../../../components/selectbox/Selectbox';
import { OptionType } from '../../../types/types';

interface CurrencySelectProps {
  currencyOptions: OptionType[];
  defaultValue: OptionType;
  labelText: string;
  onSelectCurrency: (selectedOptions: OptionType) => void;
}

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
