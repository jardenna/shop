import type { RoleTypes } from '../../app/api/apiTypes/adminApiTypes';
import RadioButton from '../../components/formElements/radiobuttons/RadioButton';
import type { ChangeInputType } from '../../types/types';
import { roleButtonList } from '../../utils/utils';

type RoleRadioBtnProps = {
  roleValue: RoleTypes;
  onChange: (event: ChangeInputType) => void;
};

const RoleRadioBtn = ({ roleValue, onChange }: RoleRadioBtnProps) => (
  <RadioButton
    radioButtonList={roleButtonList}
    name="role"
    initialChecked={roleValue}
    onChange={onChange}
  />
);

export default RoleRadioBtn;
