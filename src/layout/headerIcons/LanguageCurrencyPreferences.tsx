import FieldSet from '../../components/fieldset/FieldSet';
import RadioButtonList from '../../components/formElements/radiobuttons/RadioButtonList';
import CurrencySelect from '../../features/currency/components/CurrencySelect';
import useLanguage, {
  languageOptions,
} from '../../features/language/useLanguage';
import type { HeaderProps } from '../header/Header';

type OmittedHeaderProps = Omit<
  HeaderProps,
  | 'primaryActionBtn'
  | 'secondaryActionBtn'
  | 'ariaLabel'
  | 'userDropdownList'
  | 'isMobileSize'
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
      <FieldSet legendText={language.language}>
        <RadioButtonList
          radioButtonList={languageOptions}
          name="languageOption"
          initialChecked={values.languageOption}
          onChange={onChange}
          autoFocus
          className="language-options"
        />
      </FieldSet>
      <FieldSet legendText={language.currency}>
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
