import FieldSet from '../../components/fieldset/FieldSet';
import RadioButton from '../../components/formElements/radiobuttons/RadioButton';
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
        <RadioButton
          radioButtonList={languageOptions}
          name="languageOption"
          initialChecked={values.languageOption}
          onChange={onChange}
          autoFocus
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
