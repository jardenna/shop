import type { Roles } from '../../app/api/apiTypes/adminApiTypes';
import RadioButtonList from '../../components/formElements/radiobuttons/RadioButtonList';
import type { ChangeInputType } from '../../types/types';
import { roleList } from '../../utils/productLists';

type RoleRadioBtnProps = {
  roleValue: Roles;
  onChange: (event: ChangeInputType) => void;
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
