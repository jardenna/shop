import { useState } from 'react';
import type { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import type { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import validateNEmail from '../../../components/formElements/validation/validateNotityEmail';
import validateNotityMe from '../../../components/formElements/validation/validateNotityMe';
import { PrimaryActionBtnProps } from '../../../components/modal/Modal';
import ModalContainer from '../../../components/modal/ModalContainer';
import useFormValidation from '../../../hooks/useFormValidation';
import { InitialNotifyValues } from '../../../pages/SingleProductPage';
import { BtnType, BtnVariant, SizeVariant } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';
import NotifyMeForm from './NotifyMeForm';

type NotifiMeProps = {
  currentUser: UserResponse | undefined;
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
    label: successMessage ? 'Continue shopping' : language.notifyMe,
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
      modalSize={SizeVariant.Sm}
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
