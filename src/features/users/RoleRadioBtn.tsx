import type { Roles } from '../../app/api/apiTypes/adminApiTypes';
import RadioButton from '../../components/formElements/radiobuttons/RadioButton';
import type { ChangeInputType } from '../../types/types';
import { roleList } from '../../utils/utils';

type RoleRadioBtnProps = {
  roleValue: Roles;
  onChange: (event: ChangeInputType) => void;
};

const RoleRadioBtn = ({ roleValue, onChange }: RoleRadioBtnProps) => (
  <RadioButton
    radioButtonList={roleList}
    name="role"
    initialChecked={roleValue}
    onChange={onChange}
  />
);

export default RoleRadioBtn;
