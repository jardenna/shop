import { useState } from 'react';
import type { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import type { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import { PrimaryActionBtnProps } from '../../../components/modal/Modal';
import ModalContainer from '../../../components/modal/ModalContainer';
import useFormValidation from '../../../hooks/useFormValidation';
import { BtnType, BtnVariant } from '../../../types/enums';
import validateNEmail from '../../../utils/validation/validateNotityEmail';
import validateNotityMe from '../../../utils/validation/validateNotityMe';
import useLanguage from '../../language/useLanguage';
import NotifyMeForm from './NotifyMeForm';

export type InitialNotifyValues = {
  email: string;
  sizes: Size[];
};

type NotifiMeProps = {
  currentUser: UserResponse | null;
  id: string;
  options: string[];
  sizesIsRequered?: boolean;
};

const NotifyMe = ({
  options,
  id,
  currentUser,
  sizesIsRequered,
}: NotifiMeProps) => {
  const { language } = useLanguage();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      validate: sizesIsRequered ? validateNotityMe : validateNEmail,
    });

  function handleSendEmail() {
    setSuccessMessage(language.notifySuccessMeMessage);
    onClearAllValues();
  }

  const primaryActionBtn: PrimaryActionBtnProps = {
    onSubmit,
    label: successMessage ? language.continueShopping : language.notifyMe,
    buttonType: BtnType.Submit,
    closeOnClick: !!successMessage,
  };

  return (
    <ModalContainer
      triggerModalBtnContent={
        sizesIsRequered ? language.currentlyUnavailableSizes : language.notifyMe
      }
      triggerModalBtnVariant={BtnVariant.Ghost}
      id={id}
      onClearAllValues={onClearAllValues}
      primaryActionBtn={primaryActionBtn}
      modalHeaderText={
        sizesIsRequered
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
          sizesIsRequered={sizesIsRequered}
        />
      )}
    </ModalContainer>
  );
};

export default NotifyMe;
