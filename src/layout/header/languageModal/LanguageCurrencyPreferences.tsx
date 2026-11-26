import FieldSet from '../../../components/fieldset/FieldSet';
import RadioTileList from '../../../components/formElements/radioTileList/RadioTileList';
import Selectbox from '../../../components/selectbox/Selectbox';
import { languageOptions } from '../../../features/language/useLanguage';
import type { BaseHeaderProps } from '../Header';

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
      <Selectbox
        id="currency"
        defaultValue={defaultValue}
        options={currencyOptions}
        onChange={onSelectCurrency}
        name="currency"
        labelText={localLanguage.currency}
        inputHasNoLabel
      />
    </FieldSet>
  </div>
);

export default LanguageCurrencyPreferences;
