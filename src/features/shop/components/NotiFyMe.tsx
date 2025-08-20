import { useState } from 'react';
import { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import validateNEmail from '../../../components/formElements/validation/validateNotityEmail';
import validateNotityMe from '../../../components/formElements/validation/validateNotityMe';
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
  const initialState: InitialNotifyValues = {
    sizes: [],
    email: currentUser?.email ?? '',
  };

  const { onChange, values, onSubmit, errors } = useFormValidation<{
    email: string;
    sizes: Size[];
  }>({
    initialState,
    callback: handleSendEmail,
    validate: sizesIsRequered ? validateNotityMe : validateNEmail,
  });

  function handleSendEmail() {
    setSuccessMessage(language.notiftySuccessMeMessage);
  }

  const primaryActionBtn = {
    onSubmit,
    label: successMessage ? 'Continue shopping' : language.notiftyMe,
    buttonType: BtnType.Submit,
    closeOnClick: !!successMessage,
  };

  return (
    <ModalContainer
      triggerModalBtnContent="Missing sizes"
      triggerModalBtnVariant={BtnVariant.Ghost}
      id={id}
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
