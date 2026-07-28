import { useState } from 'react';
import type { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import type { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import { PrimaryActionBtnProps } from '../../../components/modal/Modal';
import ModalContainer from '../../../components/modal/ModalContainer';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { BtnVariant } from '../../../types/enums';
import { validateNEmail } from '../../../utils/validation/validateNotityEmail';
import { validateNotityMe } from '../../../utils/validation/validateNotityMe';
import { useLanguage } from '../../language/useLanguage';
import NotifyMeForm from './NotifyMeForm';

export type InitialNotifyValues = {
  email: string;
  sizes: Size[];
};

type NotifiMeProps = {
  currentUser: UserResponse | null;
  id: string;
  isOutOfStock: boolean;
  options: string[];
  btnVariant?: BtnVariant;
};

const NotifyMe = ({
  options,
  id,
  currentUser,
  btnVariant = BtnVariant.Ghost,
  isOutOfStock,
}: NotifiMeProps) => {
  const { language } = useLanguage();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const hasMissingSizes = !isOutOfStock && options.length > 0;

  const sizes: Size[] = options.length === 1 ? [options[0] as Size] : [];
  const initialState: InitialNotifyValues = {
    sizes,
    email: currentUser?.email ?? '',
  };

  const { onChange, values, onSubmit, errors, onClearAllValues } =
    useFormValidation<{
      email: string;
      sizes: Size[];
    }>({
      initialState,
      callback: handleSendEmail,
      validate: hasMissingSizes ? validateNotityMe : validateNEmail,
    });

  const handleClearAllValues = () => {
    onClearAllValues();
    setTimeout(() => {
      setSuccessMessage(null);
    }, 350);
  };

  function handleSendEmail() {
    setSuccessMessage(language.notifySuccessMeMessage);
  }

  const isSuccess = Boolean(successMessage);

  const primaryActionBtn: PrimaryActionBtnProps = {
    label: isSuccess ? language.continueShopping : language.notifyMe,
    buttonType: isSuccess ? undefined : 'submit',
    isForm: !isSuccess,
    closeOnClick: isSuccess,
    onSubmit: isSuccess ? undefined : onSubmit,
  };

  return (
    <ModalContainer
      triggerModalBtnContent={
        hasMissingSizes ? language.currentlyUnavailableSizes : language.notifyMe
      }
      triggerModalBtnVariant={btnVariant}
      id={id}
      onClearAllValues={handleClearAllValues}
      primaryActionBtn={primaryActionBtn}
      secondaryActionBtn={null}
      showCloseIcon
      modalHeaderText={
        hasMissingSizes
          ? language.currentlyUnavailableSizes
          : language.temporarilyOutOfStock
      }
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
    </ModalContainer>
  );
};

export default NotifyMe;
