import { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import Icon from '../../../components/icons/Icon';
import Popup from '../../../components/popup/Popup';
import EditTableText from '../../../components/sortTable/EditTableText';
import { ColumnKey } from '../../../pages/admin/UserPage';
import { BtnVariant, IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import EditUserInput from './EditUserInput';

type UpdateUserProps = {
  ariaLabel: string;
  id: ColumnKey;
  roleValue: Roles;
  text: string;
  value: string;
  onEditChange: (event: ChangeInputType) => void;
  onOpenPopup: () => void;
  onSaveEdit: () => void;
};

const UpdateUser = ({
  text,
  onOpenPopup,
  id,
  onSaveEdit,
  onEditChange,
  value,
  ariaLabel,
  roleValue,
}: UpdateUserProps) => (
  <div>
    <EditTableText text={text} />
    <Popup
      onOpenPopup={onOpenPopup}
      popupContent={({ close }) => (
        <EditUserInput
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
        />
      )}
      triggerBtnVariant={BtnVariant.Ghost}
      ariaLabel={ariaLabel}
    >
      <Icon iconName={IconName.Pencil} />
    </Popup>
  </div>
);

export default UpdateUser;
