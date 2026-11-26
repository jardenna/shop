import { useId } from 'react';
import IconContent from '../../../components/IconContent';
import FormModal from '../../../components/Modal/FormModal';
import TriggerModalButton from '../../../components/Modal/TriggerModalButton';
import { useModal } from '../../../components/Modal/useModal';
import type { InputChangeHandler } from '../../../shared/types';
import type { Values } from '../Header';
import LanguageCurrencyPreferences from './LanguageCurrencyPreferences';

interface LanguageProps {
  localLanguage: Record<string, string>;
  onChange: InputChangeHandler;
  values: Values;
  onSubmit: () => void;
}

const LanguageModal = ({
  onChange,
  values,
  onSubmit,
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
        variant="ghost"
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
          localLanguage={localLanguage}
        />
      </FormModal>
    </>
  );
};

export default LanguageModal;
