import FieldSet from '../../../components/fieldset/FieldSet';
import RadioTileList from '../../../components/formElements/radioTileList/RadioTileList';
import Selectbox from '../../../components/selectbox/Selectbox';
import type { CurrencyCode } from '../../../features/currency/currencyConverterUtil';
import { useCurrency } from '../../../features/currency/useCurrency';
import type { SelectedLanguage } from '../../../features/language/languageSlice';
import { languageOptions } from '../../../features/language/useLanguage';
import type { OmitChecked } from '../../../shared/types';
import type { BaseHeaderProps } from '../Header';

export interface LanguageCurrencyPreferencesValues {
  currencyOption: CurrencyCode;
  languageOption: SelectedLanguage;
}

type OmittedHeaderProps = OmitChecked<BaseHeaderProps, 'onSubmit'>;

const LanguageCurrencyPreferences = ({
  values,
  onChange,
  onSelectChange,
  localLanguage,
}: OmittedHeaderProps) => {
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
        <Selectbox
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
