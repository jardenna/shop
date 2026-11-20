import { useId } from 'react';
import IconContent from '../../../components/IconContent';
import FormModal from '../../../components/Modal/FormModal';
import TriggerModalButton from '../../../components/Modal/TriggerModalButton';
import { useModal } from '../../../components/Modal/useModal';
import { BtnVariant } from '../../../types/enums';
import type { InputChangeHandler, OptionType } from '../../../types/types';
import type { Values } from '../Header';
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
  const ariaControlsId = useId();
  const modalId = 'language';

  const { closeModal } = useModal();

  const handleSubmit = () => {
    onSubmit();
    closeModal();
  };

  return (
    <>
      <TriggerModalButton
        ariaControls={ariaControlsId}
        modalId={modalId}
        variant={BtnVariant.Ghost}
      >
        <IconContent
          iconName="language"
          ariaLabel={localLanguage.selectPreferences}
        />
      </TriggerModalButton>
      <FormModal
        submitLabel={localLanguage.updatePreferences}
        ariaControls={ariaControlsId}
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
