import { FC } from 'react';
import Selectbox, { OptionType } from '../../../components/selectBox/SelectBox';

interface CurrencySelectProps {
  defaultValue: OptionType;
  options: OptionType[];
  onSelectCurrency: (selectedOptions: OptionType) => void;
}
const CurrencySelect: FC<CurrencySelectProps> = ({
  options,
  defaultValue,
  onSelectCurrency,
}) => (
  <section>
    <Selectbox
      id="currency"
      defaultValue={defaultValue}
      options={options}
      onChange={onSelectCurrency}
      name="currency"
      labelText="Select currency"
    />
  </section>
);
export default CurrencySelect;
