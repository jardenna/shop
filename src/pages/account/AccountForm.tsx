import { UserProfileResponse } from '../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import Input from '../../components/formElements/Input';
import type {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import { BtnType, SizeVariant } from '../../types/enums';

export type AccountFormProps = {
  profile: UserProfileResponse;
};

const AccountForm = ({ profile }: AccountFormProps) => {
  const { language } = useLanguage();

  const initialState = {
    username: profile.username,
    email: profile.email,
    phoneNo: profile.phoneNo ?? '',
    dateOfBirth: profile.dateOfBirth ?? '',
    preferredFashion: profile.preferredFashion,
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  function handleSubmit() {
    console.log(values);
  }

  const primaryActionBtn: PrimaryActionBtnProps = {
    onSubmit,
    label: language.update,
    buttonType: BtnType.Submit,
  };
  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <ModalContainer
      triggerModalBtnContent={language.update}
      id="id"
      modalSize={SizeVariant.Md}
      primaryActionBtn={primaryActionBtn}
      modalHeaderText={language.updateYourInfo}
      secondaryActionBtn={secondaryActionBtn}
      className="my-account"
    >
      <FieldSet legendText={language.userInfo} hideLegendText>
        <Input
          value={values.username}
          name="username"
          id="username"
          labelText={language.name}
          onChange={onChange}
        />
        <Input
          value={values.phoneNo}
          name="phoneNo"
          id="phoneNo"
          labelText={language.phone}
          onChange={onChange}
          type="number"
        />
        <Input
          value={values.email}
          name="email"
          id="email"
          labelText={language.email}
          onChange={onChange}
          type="email"
        />
        <Input
          value={values.dateOfBirth}
          name="dateOfBirth"
          id="dateOfBirth"
          labelText={language.dateOfBirth}
          onChange={onChange}
          type="date"
        />
      </FieldSet>
    </ModalContainer>
  );
};

export default AccountForm;
