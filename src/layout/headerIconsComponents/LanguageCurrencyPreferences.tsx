import { FC } from 'react';
import FieldSet from '../../components/fieldset/FieldSet';
import RadioButton from '../../components/formElements/radioButton/RadioButton';
import CurrencySelect from '../../features/currency/components/CurrencySelect';
import useLanguage, {
  languageOptions,
} from '../../features/language/useLanguage';
import { HeaderProps } from '../header/Header';

type OmittedHeaderProps = Omit<
  HeaderProps,
  'primaryActionBtn' | 'ariaLabel' | 'userDropdownList'
>;

const LanguageCurrencyPreferences: FC<OmittedHeaderProps> = ({
  values,
  onChange,
  currencyOptions,
  defaultValue,
  onSelectCurrency,
}) => {
  const { language } = useLanguage();

  return (
    <div className="preferences">
      <FieldSet legendText={language.selectLanguage} showLegendText>
        <RadioButton
          radioButtonList={languageOptions}
          name="languageOption"
          initialChecked={values.languageOption}
          onChange={onChange}
          radioBtnVariant="card"
        />
      </FieldSet>
      <FieldSet legendText={language.selectCurrency} showLegendText>
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
