import FieldSet from '../../components/fieldset/FieldSet';
import RadioButtonList from '../../components/formElements/RadioButtonList';
import CurrencySelect from '../../features/currency/components/CurrencySelect';
import useLanguage, {
  languageOptions,
} from '../../features/language/useLanguage';
import type { OmitChecked } from '../../types/types';
import type { BaseHeaderProps } from '../header/Header';

type OmittedHeaderProps = OmitChecked<
  BaseHeaderProps,
  'primaryActionBtn' | 'secondaryActionBtn' | 'dropdownBtnList'
>;

const LanguageCurrencyPreferences = ({
  values,
  onChange,
  currencyOptions,
  defaultValue,
  onSelectCurrency,
}: OmittedHeaderProps) => {
  const { language } = useLanguage();

  return (
    <div className="preferences">
      <FieldSet legendText={language.language} showLegendText>
        <RadioButtonList
          radioButtonList={languageOptions}
          name="languageOption"
          initialChecked={values.languageOption}
          onChange={onChange}
          autoFocus
          variant="secondary"
        />
      </FieldSet>
      <FieldSet legendText={language.currency} showLegendText>
        <CurrencySelect
          inputHasNoLabel
          currencyOptions={currencyOptions}
          defaultValue={defaultValue}
          onSelectCurrency={onSelectCurrency}
          labelText={language.currency}
        />
      </FieldSet>
    </div>
  );
};

export default LanguageCurrencyPreferences;
