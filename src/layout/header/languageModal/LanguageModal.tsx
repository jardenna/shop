import { useId } from 'react';
import IconContent from '../../../components/IconContent';
import FormModal from '../../../components/Modal/FormModal';
import TriggerModalButton from '../../../components/Modal/TriggerModalButton';
import { useModal } from '../../../components/Modal/useModal';
import type { BaseHeaderProps } from '../Header';
import LanguageCurrencyPreferences from './LanguageCurrencyPreferences';

const LanguageModal = ({
  onChange,
  values,
  onSubmit,
  onSelectChange,
  localLanguage,
}: BaseHeaderProps) => {
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
          onSelectChange={onSelectChange}
        />
      </FormModal>
    </>
  );
};

export default LanguageModal;
