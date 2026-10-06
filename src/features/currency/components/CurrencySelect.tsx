import Selectbox from '../../../components/selectbox/Selectbox';
import { OptionTypeNew } from '../../../types/types';

interface CurrencySelectProps {
  currencyOptions: OptionTypeNew[];
  defaultValue: OptionTypeNew;
  labelText: string;
  onSelectCurrency: (selectedOptions: OptionTypeNew) => void;
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
