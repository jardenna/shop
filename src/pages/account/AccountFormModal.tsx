import { useEffect, useState } from 'react';
import type {
  BaseProfile,
  PreferredFashion,
  UserProfileResponse,
} from '../../app/api/apiTypes/shopApiTypes';
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
import type { OptionType } from '../../types/types';
import handleApiError from '../../utils/handleApiError';
import validateProfile from '../../utils/validation/validateProfile';
import type { ProfileFieldListProps } from './MyAccountPage';

type AccountFormModalProps = {
  profile: UserProfileResponse;
  profileFieldList: ProfileFieldListProps[];
};

const preferredFashion: PreferredFashion[] = [
  'mensFashion',
  'womensFashion',
  'kidsFashion',
  'noPreference',
];

const AccountFormModal = ({
  profile,
  profileFieldList,
}: AccountFormModalProps) => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const [resultSuccess, setResultSuccess] = useState<boolean | null>(null);

  const preferredFashionList: OptionType[] = preferredFashion.map(
    (fashion) => ({
      value: fashion,
      label: fashion,
    }),
  );

  const initialState: BaseProfile = {
    username: profile.username,
    email: profile.email,
    phoneNo: profile.phoneNo,
    dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
    preferredFashion: profile.preferredFashion,
  };

  const { values, onChange, onSubmit, onClearAllValues, errors } =
    useFormValidation({
      initialState,
      callback: handleSubmit,
      validate: validateProfile,
    });

  const [updateProfile, { isLoading, reset }] = useUpdateUserProfileMutation();

  // Reset resultSuccess when modal closes
  useEffect(() => {
    if (!resultSuccess) {
      return;
    }
    const timer = setTimeout(() => {
      setResultSuccess(null);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [resultSuccess]);

  async function handleSubmit() {
    try {
      await updateProfile(values).unwrap();
      onAddMessagePopup({
        message: language.yourDetailsUpdated,
      });
      setResultSuccess(true);
      onClearAllValues();
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
      setResultSuccess(false);
    }
  }

  const primaryActionBtn: PrimaryActionBtnProps = {
    onSubmit,
    label: language.update,
    buttonType: BtnType.Submit,
    disabled: isLoading,
    showBtnLoader: isLoading,
    resultSuccess,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <ModalContainer
      triggerModalBtnContent={language.update}
      onClearAllValues={onClearAllValues}
      id="id"
      modalSize={SizeVariant.Md}
      primaryActionBtn={primaryActionBtn}
      modalHeaderText={language.updateYourInfo}
      secondaryActionBtn={secondaryActionBtn}
      onBoundaryReset={() => {
        reset();
      }}
      className="my-account"
    >
      <FieldSet legendText={language.userInfo}>
        {profileFieldList.map(({ name, label, type, required }) => (
          <Input
            key={name}
            value={values[name]}
            name={name}
            id={name}
            labelText={language[label]}
            onChange={onChange}
            type={type}
            required={required}
            errorText={language[errors[name]]}
          />
        ))}
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

export default AccountFormModal;
