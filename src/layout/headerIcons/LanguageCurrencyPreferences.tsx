import FieldSet from '../../components/fieldset/FieldSet';
import RadioButtonList from '../../components/formElements/RadioButtonList';
import CurrencySelect from '../../features/currency/components/CurrencySelect';
import { languageOptions } from '../../features/language/useLanguage';
import type { OmitChecked } from '../../types/types';
import type { BaseHeaderProps } from '../header/Header';

type OmittedHeaderProps = OmitChecked<
  BaseHeaderProps,
  'primaryActionBtn' | 'dropdownBtnList'
>;

const LanguageCurrencyPreferences = ({
  values,
  onChange,
  currencyOptions,
  defaultValue,
  onSelectCurrency,
  localLanguage,
}: OmittedHeaderProps) => (
  <div className="preferences">
    <FieldSet legendText={localLanguage.language} showLegendText>
      <RadioButtonList
        radioButtonList={languageOptions}
        name="languageOption"
        initialChecked={values.languageOption}
        onChange={onChange}
        autoFocus
        variant="secondary"
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
