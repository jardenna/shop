import FieldSet from '../../../components/fieldset/FieldSet';
import RadioTileList from '../../../components/formElements/radioTileList/RadioTileList';
import Selectbox from '../../../components/selectbox/Selectbox';
import { useCurrency } from '../../../features/currency/useCurrency';
import type { SelectedLanguage } from '../../../features/language/languageSlice';
import { languageOptions } from '../../../features/language/useLanguage';
import type {
  InputChangeHandler,
  Language,
  OptionType,
} from '../../../shared/types';

export interface Values {
  languageOption: SelectedLanguage;
}

interface BaseHeaderProps {
  localLanguage: Language;
  onChange: InputChangeHandler;
  values: Values;
}

const LanguageCurrencyPreferences = ({
  values,
  onChange,
  localLanguage,
}: BaseHeaderProps) => {
  const { currencyOptions, exchangeRate } = useCurrency();

  const handleSelectCurrency = (selectedOptions: OptionType) => {
    onChange({
      target: { name: 'currencyOption', value: selectedOptions.value },
    } as Parameters<InputChangeHandler>[0]);
  };

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
        <Selectbox
          id="currency"
          defaultValue={{
            label: exchangeRate,
            value: exchangeRate,
            id: exchangeRate,
          }}
          options={currencyOptions}
          onChange={handleSelectCurrency}
          name="currency"
          labelText={localLanguage.currency}
          inputHasNoLabel
        />
      </FieldSet>
    </div>
  );
};

export default LanguageCurrencyPreferences;
