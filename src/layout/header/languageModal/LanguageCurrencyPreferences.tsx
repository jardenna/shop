import FieldSet from '../../../components/fieldset/FieldSet';
import RadioTileList from '../../../components/formElements/radioTileList/RadioTileList';
import CurrencySelect from '../../../features/currency/components/CurrencySelect';
import { languageOptions } from '../../../features/language/useLanguage';
import { BaseHeaderProps } from '../Header';

const LanguageCurrencyPreferences = ({
  values,
  onChange,
  currencyOptions,
  defaultValue,
  onSelectCurrency,
  localLanguage,
}: BaseHeaderProps) => (
  <div className="preferences">
    <FieldSet legendText={localLanguage.language} showLegendText>
      <RadioTileList
        radioButtonList={languageOptions}
        name="languageOption"
        checked={values.languageOption}
        onChange={onChange}
      />
    </FieldSet>
    <FieldSet legendText={localLanguage.currency} showLegendText>
      <CurrencySelect
        currencyOptions={currencyOptions}
        defaultValue={defaultValue}
        onSelectCurrency={onSelectCurrency}
        labelText={localLanguage.currency}
      />
    </FieldSet>
  </div>
);

export default LanguageCurrencyPreferences;
