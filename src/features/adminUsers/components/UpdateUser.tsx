import { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import Icon from '../../../components/icons/Icon';
import Popup from '../../../components/popup/Popup';
import EditTableText from '../../../components/sortTable/EditTableText';
import { BtnVariant, IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import EditUserInput from './EditUserInput';

type UpdateUserProps = {
  ariaLabel: string;
  columnKey: 'role' | 'email' | 'username';
  onOpenPopup: any;
  roleValue: Roles;
  text: string;
  value: string;
  handleSaveEdit: () => void;
  onEditChange: (event: ChangeInputType) => void;
};

const UpdateUser = ({
  text,
  onOpenPopup,
  columnKey,
  handleSaveEdit,
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
          labelText={columnKey}
          onSave={() => {
            handleSaveEdit();
            close();
          }}
          onCancel={close}
          onEditChange={onEditChange}
          id={columnKey}
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
