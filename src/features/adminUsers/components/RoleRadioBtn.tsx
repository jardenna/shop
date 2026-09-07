import type { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import RadioTileList from '../../../components/formElements/RadioTileList';
import type { InputChangeHandler } from '../../../types/types';
import { roleList } from '../../../utils/productLists';

type RoleRadioBtnProps = {
  onChange: InputChangeHandler;
  roleValue: Roles;
};

const RoleRadioBtn = ({ roleValue, onChange }: RoleRadioBtnProps) => (
  <RadioTileList
    radioButtonList={roleList}
    name="role"
    checked={roleValue}
    onChange={onChange}
  />
);

export default RoleRadioBtn;
