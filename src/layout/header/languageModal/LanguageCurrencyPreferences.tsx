import FieldSet from '../../../components/fieldset/FieldSet';
import RadioTileList from '../../../components/formElements/radioTileList/RadioTileList';
import SelectboxNew from '../../../components/selectbox/SelectboxNew';
import type { CurrencyCode } from '../../../features/currency/currencyConverterUtil';
import { useCurrency } from '../../../features/currency/useCurrency';
import type { SelectedLanguage } from '../../../features/language/languageSlice';
import { languageOptions } from '../../../features/language/useLanguage';
import type { InputChangeHandler, Language } from '../../../shared/types';

export interface LanguageCurrencyPreferencesValues {
  currencyOption: CurrencyCode;
  languageOption: SelectedLanguage;
}

interface LanguageCurrencyPreferencesProps {
  localLanguage: Language;
  onChange: InputChangeHandler;
  onSelectChange: any;
  values: LanguageCurrencyPreferencesValues;
}

const LanguageCurrencyPreferences = ({
  values,
  onChange,
  onSelectChange,
  localLanguage,
}: LanguageCurrencyPreferencesProps) => {
  const { currencyOptions } = useCurrency();

  return (
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
        <SelectboxNew
          id="currency"
          options={currencyOptions}
          onChange={onSelectChange}
          name="currencyOption"
          labelText={localLanguage.currency}
          inputHasNoLabel
          value={values.currencyOption}
        />
      </FieldSet>
    </div>
  );
};

export default LanguageCurrencyPreferences;
