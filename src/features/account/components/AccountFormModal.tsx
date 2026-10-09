import { useId } from 'react';
import type {
  BaseProfile,
  MyAccountResponse,
  PreferredFashion,
} from '../../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Input from '../../../components/formElements/Input';
import RadioTileList from '../../../components/formElements/radioTileList/RadioTileList';
import FormModal from '../../../components/Modal/FormModal';
import TriggerModalButton from '../../../components/Modal/TriggerModalButton';
import { useModal } from '../../../components/Modal/useModal';
import { useToast } from '../../../components/toast/hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';
import type { ProfileFieldListProps } from '../../../pages/MyAccountPage';
import type { OptionType } from '../../../types/types';
import { validateAccount } from '../../../utils/validation/validateAccount';
import { useLanguage } from '../../language/useLanguage';
import { useUpdateMyAccountMutation } from '../accountApiSlice';

interface AccountFormModalProps {
  profile: MyAccountResponse;
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
      id: fashion,
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
      validate: validateAccount,
    },
  );

  const [updateProfile, { isLoading, reset }] = useUpdateMyAccountMutation();

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
      <TriggerModalButton
        modalId={modalId}
        ariaControls={ariaControls}
        className="account-trigger-modal"
      >
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
          {profileFieldList.map(
            ({ name, label, type, required, inputMode }) => (
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
                inputMode={inputMode}
              />
            ),
          )}
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
