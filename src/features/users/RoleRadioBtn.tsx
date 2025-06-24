import type { RoleTypes } from '../../app/api/apiTypes/adminApiTypes';
import RadioButton, {
  RadioBtnVariant,
} from '../../components/formElements/RadioButton';
import type { ChangeInputType } from '../../types/types';
import { roleButtonList } from '../../utils/utils';

type RoleRadioBtnProps = {
  roleValue: RoleTypes;
  radioBtnVariant?: RadioBtnVariant;
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
