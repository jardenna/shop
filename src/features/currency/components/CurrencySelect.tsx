import { FC } from 'react';
import Selectbox, { OptionType } from '../../../components/selectBox/SelectBox';

interface CurrencySelectProps {
  defaultValue: OptionType;
  inputHasNoLabel: boolean;
  labelText: string;
  options: OptionType[];
  onSelectCurrency: (selectedOptions: OptionType) => void;
}
const CurrencySelect: FC<CurrencySelectProps> = ({
  options,
  defaultValue,
  onSelectCurrency,
  labelText,
}) => (
  <Selectbox
    id="currency"
    defaultValue={defaultValue}
    options={options}
    onChange={onSelectCurrency}
    name="currency"
    labelText={labelText}
    inputHasNoLabel
  />
);
export default CurrencySelect;
