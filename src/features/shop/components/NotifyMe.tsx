import { useId, useState } from 'react';
import type { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import type { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import Button from '../../../components/Button';
import PopModal from '../../../components/popModal/PopModal';

import TriggerModalButton from '../../../components/popModal/TriggerModalButton';
import { usePopModal } from '../../../components/popModal/usePopModal';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { BtnVariant } from '../../../types/enums';
import { validateNotityMe } from '../../../utils/validation/validateNotityMe';
import { useLanguage } from '../../language/useLanguage';
import NotifyMeForm from './NotifyMeForm';
import { validateNotefyEmail } from '../../../utils/validation/validateNotityEmail';

export interface InitialNotifyValues {
  email: string;
  sizes: Size[];
}

interface NotifiMeProps {
  currentUser: UserResponse | null;
  isOutOfStock: boolean;
  options: string[];
}

const NotifyMe = ({ options, currentUser, isOutOfStock }: NotifiMeProps) => {
  const ariaControls = useId();
  const modalId = 'notify';
  const { language } = useLanguage();
  const { closeModal } = usePopModal();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const hasMissingSizes = !isOutOfStock && options.length > 0;

  const sizes: Size[] = options.length === 1 ? [options[0] as Size] : [];
  const initialState: InitialNotifyValues = {
    sizes,
    email: currentUser?.email ?? '',
  };

  const { onChange, values, onSubmit, errors } = useFormValidation<{
    email: string;
    sizes: Size[];
  }>({
    initialState,
    callback: handleNotifyMe,
    validate: hasMissingSizes ? validateNotityMe : validateNotefyEmail,
  });

  function handleNotifyMe() {
    setSuccessMessage(language.notifySuccessMeMessage);
  }

  return (
    <>
      <TriggerModalButton
        ariaControls={ariaControls}
        modalId={modalId}
        variant={BtnVariant.Ghost}
      >
        {hasMissingSizes
          ? language.currentlyUnavailableSizes
          : language.notifyMe}
      </TriggerModalButton>

      <PopModal
        modalId={modalId}
        showCloseIcon
        headerText={
          hasMissingSizes
            ? language.currentlyUnavailableSizes
            : language.temporarilyOutOfStock
        }
        ariaControls={ariaControls}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          {successMessage ? (
            <p>{successMessage}</p>
          ) : (
            <NotifyMeForm
              options={options}
              values={values}
              errors={errors}
              onChange={onChange}
              sizesIsRequered={hasMissingSizes}
            />
          )}

          <footer className="footer">
            {successMessage ? (
              <Button onClick={closeModal}>{language.continueShopping}</Button>
            ) : (
              <Button type="submit">{language.notifyMe}</Button>
            )}
          </footer>
        </form>
      </PopModal>
    </>
  );
};

export default NotifyMe;
