import { FC } from 'react';
import Selectbox, { OptionType } from '../../../components/selectBox/SelectBox';

interface CurrencySelectProps {
  defaultValue: OptionType;
  inputHasNoLabel: boolean;
  options: OptionType[];
  onSelectCurrency: (selectedOptions: OptionType) => void;
}
const CurrencySelect: FC<CurrencySelectProps> = ({
  options,
  defaultValue,
  onSelectCurrency,
}) => (
  <Selectbox
    id="currency"
    defaultValue={defaultValue}
    options={options}
    onChange={onSelectCurrency}
    name="currency"
    labelText="Currency"
    inputHasNoLabel
  />
);
export default CurrencySelect;
