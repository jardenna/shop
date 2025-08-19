import { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import CheckboxControls from '../../../components/formElements/controlGroup/CheckboxControls';
import Input from '../../../components/formElements/Input';
import validateNEmail from '../../../components/formElements/validation/validateNotityEmail';
import validateNotityMe from '../../../components/formElements/validation/validateNotityMe';
import { SecondaryActionBtnProps } from '../../../components/modal/Modal';
import ModalContainer from '../../../components/modal/ModalContainer';
import useFormValidation from '../../../hooks/useFormValidation';
import { InitialNotifyValues } from '../../../pages/SingleProductPage';
import { BtnType, BtnVariant, SizeVariant } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';

type NotifiMeProps = {
  currentUser: UserResponse | undefined;
  id: string;
  options: string[];
  sizesIsRequered?: boolean;
};

const NotiFyMe = ({
  options,
  id,
  currentUser,
  sizesIsRequered,
}: NotifiMeProps) => {
  const { language } = useLanguage();
  const initialState: InitialNotifyValues = {
    sizes: [],
    email: currentUser?.email ?? '',
  };

  const { onChange, values, onSubmit, errors } = useFormValidation<{
    email: string;
    sizes: Size[];
  }>({
    initialState,
    callback: () => {
      console.log(values);
    },
    validate: sizesIsRequered ? validateNotityMe : validateNEmail,
  });

  const primaryActionBtn = {
    onSubmit,
    label: language.notiftyMe,
    buttonType: BtnType.Submit,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };
  console.log(errors);

  return (
    <ModalContainer
      triggerModalBtnContent="Missing sizes"
      triggerModalBtnVariant={BtnVariant.Ghost}
      id={id}
      primaryActionBtn={primaryActionBtn}
      secondaryActionBtn={secondaryActionBtn}
      modalSize={SizeVariant.Sm}
      modalHeaderText={
        sizesIsRequered
          ? language.currentlyUnavailableSizes
          : language.temporarilyOutOfStock
      }
    >
      {sizesIsRequered ? (
        <>
          <p>
            {language.missingYourSize}? {language.notiftyMeMessage}.
          </p>
          <CheckboxControls
            options={options}
            autoFocus
            name="sizes"
            onChange={onChange}
            values={values.sizes}
            required
            groupTitle={{
              title: language.sizes,
              id: 'missing-sizes',
              errorText: language[errors.sizes],
            }}
          />
        </>
      ) : (
        <p>{language.temporarilyOutOfStockText}.</p>
      )}
      <Input
        name="email"
        id="email"
        value={values.email}
        labelText={language.email}
        onChange={onChange}
        required
        type="email"
        errorText={language[errors.email]}
      />
    </ModalContainer>
  );
};

export default NotiFyMe;
