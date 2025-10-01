import {
  PreferredFashion,
  UserProfileResponse,
} from '../../app/api/apiTypes/sharedApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import Input from '../../components/formElements/Input';
import RadioButtonList from '../../components/formElements/RadioButtonList';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import type {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useLanguage from '../../features/language/useLanguage';
import { useUpdateUserProfileMutation } from '../../features/profile/profileApiSlice';
import useFormValidation from '../../hooks/useFormValidation';
import { BtnType, SizeVariant } from '../../types/enums';
import { OptionType } from '../../types/types';
import handleApiError from '../../utils/handleApiError';

type AccountFormProps = {
  profile: UserProfileResponse;
};

const AccountForm = ({ profile }: AccountFormProps) => {
  const { language } = useLanguage();

  const { onAddMessagePopup } = useMessagePopup();

  const preferredFashion: PreferredFashion[] = [
    'mensFashion',
    'womensFashion',
    'kidsFashion',
    'noPreference',
  ];

  const preferredFashionList: OptionType[] = preferredFashion.map(
    (fashion) => ({
      value: fashion,
      label: fashion,
    }),
  );

  const initialState = {
    username: profile.username,
    email: profile.email,
    phoneNo: profile.phoneNo ?? '',
    dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
    preferredFashion: profile.preferredFashion,
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  const [updateProfile] = useUpdateUserProfileMutation();

  async function handleSubmit() {
    try {
      await updateProfile(values).unwrap();
      onAddMessagePopup({
        messagePopupType: 'success',
        message: language.yourDetailsUpdated,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
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
      <FieldSet legendText={language.fashionPreference}>
        <RadioButtonList
          radioButtonList={preferredFashionList}
          name="preferredFashion"
          initialChecked={values.preferredFashion}
          onChange={onChange}
          variant="secondary"
        />
      </FieldSet>
    </ModalContainer>
  );
};

export default AccountForm;
