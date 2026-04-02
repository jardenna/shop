import { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import Icon from '../../../components/icons/Icon';
import Popup from '../../../components/popup/Popup';
import { ColumnKey } from '../../../pages/admin/UserPage';
import { BtnVariant, IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import EditTableText from './EditTableText';
import EditUserInput from './EditUserInput';

type UpdateUserProps = {
  ariaLabel: string;
  id: ColumnKey;
  roleValue: Roles;
  submitBtnLabel: string;
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
  submitBtnLabel,
}: UpdateUserProps) => (
  <div>
    <EditTableText text={text} />
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
