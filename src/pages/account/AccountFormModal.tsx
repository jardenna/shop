import { useId } from 'react';
import type {
  BaseProfile,
  PreferredFashion,
  UserProfileResponse,
} from '../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import Input from '../../components/formElements/Input';
import RadioTileList from '../../components/formElements/radioTileList/RadioTileList';
import FormModal from '../../components/Modal/FormModal';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { useModal } from '../../components/Modal/useModal';
import { useToast } from '../../components/toast/hooks/useToast';
import { useLanguage } from '../../features/language/useLanguage';
import { useUpdateUserProfileMutation } from '../../features/profile/profileApiSlice';
import { useFormValidation } from '../../hooks/useFormValidation';
import type { OptionType } from '../../types/types';
import { validateProfile } from '../../utils/validation/validateProfile';
import type { ProfileFieldListProps } from './MyAccountPage';

interface AccountFormModalProps {
  profile: UserProfileResponse;
  profileFieldList: ProfileFieldListProps[];
}

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
  const ariaControls = useId();
  const modalId = 'account-form';
  const { language } = useLanguage();
  const { onAddToast } = useToast();
  const { closeModal } = useModal();

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

  const { values, onChange, onSubmit, errors, isFormDirty } = useFormValidation(
    {
      initialState,
      callback: handleSubmit,
      validate: validateProfile,
    },
  );

  const [updateProfile, { isLoading, reset }] = useUpdateUserProfileMutation();

  async function handleSubmit() {
    if (!isFormDirty) {
      onAddToast({
        message: language.noChanges,
      });
      return;
    }

    await updateProfile(values).unwrap();

    onAddToast({
      message: language.yourDetailsUpdated,
    });

    reset();
    closeModal();
  }

  return (
    <>
      <TriggerModalButton modalId={modalId} ariaControls={ariaControls}>
        {language.update}
      </TriggerModalButton>
      <FormModal
        isLoading={isLoading}
        onSubmit={onSubmit}
        modalId={modalId}
        ariaControls={ariaControls}
        headerText={language.updateYourInfo}
        disabled={!isFormDirty}
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
          <RadioTileList
            radioButtonList={preferredFashionList}
            name="preferredFashion"
            checked={values.preferredFashion}
            onChange={onChange}
          />
        </FieldSet>
      </FormModal>
    </>
  );
};

export default AccountFormModal;
