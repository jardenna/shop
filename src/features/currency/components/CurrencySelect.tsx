import { FC } from 'react';
import Selectbox, { OptionType } from '../../../components/selectBox/SelectBox';

interface CurrencySelectProps {
  defaultValue: any;
  onSelectCurrency: any;
  options: OptionType[];
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
