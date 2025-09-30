import { UserProfileResponse } from '../../app/api/apiTypes/sharedApiTypes';
import DatePicker from '../../components/datePicker/DatePicker';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Input from '../../components/formElements/Input';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';

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

  const { values, onChange } = useFormValidation({ initialState });
  const { handleDaySelect, selectedDate } = useDatePicker();
  return (
    <FieldSet legendText="account">
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
      />
      <Input
        value={values.email}
        name="email"
        id="email"
        labelText={language.email}
        onChange={onChange}
        type="email"
      />
      <DatePicker
        onSelectDate={handleDaySelect}
        selectedDate={selectedDate}
        labelText={language.dateOfBirth}
      />
      {/* <Input
        value={values.dateOfBirth}
        name="dateOfBirth"
        id="dateOfBirth"
        labelText={language.dateOfBirth}
        onChange={onChange}
      /> */}
    </FieldSet>
  );
};

export default AccountForm;
