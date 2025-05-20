import RadioButton from '../../../components/formElements/RadioButton';
import { ChangeInputType } from '../../../types/types';
import { roleButtonList } from '../../../utils/utils';

type RoleRadioBtnProps = {
  roleValue: string;
  onEditChange: (event: ChangeInputType) => void;
};

const RoleRadioBtn = ({ roleValue, onEditChange }: RoleRadioBtnProps) => (
  <RadioButton
    radioButtonList={roleButtonList}
    name="role"
    initialChecked={roleValue}
    onChange={onEditChange}
  />
);

export default RoleRadioBtn;
