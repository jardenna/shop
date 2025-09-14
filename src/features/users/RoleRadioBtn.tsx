import type { Roles } from '../../app/api/apiTypes/adminApiTypes';
import RadioButtonList from '../../components/formElements/RadioButtonList';
import type { InputChangeHandler } from '../../types/types';
import { roleList } from '../../utils/productLists';

type RoleRadioBtnProps = {
  onChange: InputChangeHandler;
  roleValue: Roles;
};

const RoleRadioBtn = ({ roleValue, onChange }: RoleRadioBtnProps) => (
  <RadioButtonList
    radioButtonList={roleList}
    name="role"
    initialChecked={roleValue}
    onChange={onChange}
  />
);

export default RoleRadioBtn;
