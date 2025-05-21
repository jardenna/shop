import RadioButton from '../../../components/formElements/RadioButton';
import { ChangeInputType } from '../../../types/types';
import { roleButtonList } from '../../../utils/utils';

type RoleRadioBtnProps = {
  roleValue: string;
  radioBtnVariant?: string;
  onChange: (event: ChangeInputType) => void;
};

const RoleRadioBtn = ({
  roleValue,
  onChange,
  radioBtnVariant,
}: RoleRadioBtnProps) => (
  <RadioButton
    radioBtnVariant={radioBtnVariant}
    radioButtonList={roleButtonList}
    name="role"
    initialChecked={roleValue}
    onChange={onChange}
  />
);

export default RoleRadioBtn;
