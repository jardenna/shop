import { useId } from 'react';
import IconContent from '../../../components/IconContent';
import FormModal from '../../../components/popModal/FormModal';
import TriggerModalButton from '../../../components/popModal/TriggerModalButton';
import { usePopModal } from '../../../components/popModal/usePopModal';
import { BtnVariant, IconName } from '../../../types/enums';
import { InputChangeHandler, OptionType } from '../../../types/types';
import { Values } from '../Header';
import LanguageCurrencyPreferences from './LanguageCurrencyPreferences';

interface LanguageProps {
  currencyOptions: OptionType[];
  defaultValue: OptionType;
  localLanguage: Record<string, string>;
  onChange: InputChangeHandler;
  values: Values;
  onSelectCurrency: (selectedOptions: OptionType) => void;
  onSubmit: () => void;
}

const LanguageModal = ({
  onChange,
  values,
  currencyOptions,
  defaultValue,
  onSubmit,
  onSelectCurrency,
  localLanguage,
}: LanguageProps) => {
  const ariaControls = useId();
  const modalId = 'language';

  const { closeModal } = usePopModal();

  const handleSubmit = () => {
    onSubmit();
    closeModal();
  };

  return (
    <>
      <TriggerModalButton
        ariaControls={ariaControls}
        modalId={modalId}
        variant={BtnVariant.Ghost}
      >
        <IconContent
          iconName={IconName.Language}
          ariaLabel={localLanguage.selectPreferences}
        />
      </TriggerModalButton>
      <FormModal
        submitLabel={localLanguage.updatePreferences}
        ariaControls={ariaControls}
        headerText={localLanguage.preferences}
        modalId={modalId}
        isLoading={false}
        onSubmit={handleSubmit}
      >
        <LanguageCurrencyPreferences
          values={values}
          onChange={onChange}
          currencyOptions={currencyOptions}
          defaultValue={defaultValue}
          onSelectCurrency={onSelectCurrency}
          localLanguage={localLanguage}
        />
      </FormModal>
    </>
  );
};

export default LanguageModal;
