import { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import Icon from '../../../components/icons/Icon';
import Popup from '../../../components/popup/Popup';
import { ColumnKey } from '../../../pages/users/UserPage';
import { BtnVariant, IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import EditUserInput from './EditUserInput';

type UpdateUserProps = {
  ariaLabel: string;
  id: ColumnKey;
  isFormDirty: boolean;
  roleValue: Roles;
  submitBtnLabel: string;
  value: string;
  onEditChange: (event: ChangeInputType) => void;
  onOpenPopup: () => void;
  onSaveEdit: () => void;
};

const UpdateUser = ({
  onOpenPopup,
  id,
  onSaveEdit,
  onEditChange,
  value,
  ariaLabel,
  isFormDirty,
  roleValue,
  submitBtnLabel,
}: UpdateUserProps) => (
  <Popup
    onOpenPopup={onOpenPopup}
    popupContent={({ close }) => (
      <EditUserInput
        submitBtnLabel={submitBtnLabel}
        labelText={id}
        onSave={() => {
          onSaveEdit();
          close();
        }}
        onCancel={close}
        onEditChange={onEditChange}
        id={id}
        value={value}
        roleValue={roleValue}
        isFormDirty={isFormDirty}
      />
    )}
    triggerBtnVariant={BtnVariant.Ghost}
    ariaLabel={ariaLabel}
  >
    <Icon iconName={IconName.Pencil} />
  </Popup>
);

export default UpdateUser;
