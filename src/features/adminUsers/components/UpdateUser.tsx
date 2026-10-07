import { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import Icon from '../../../components/icons/Icon';
import Popup from '../../../components/popup/Popup';
import { ColumnKey } from '../../../pages/users/UserPage';
import { BtnVariant, IconName } from '../../../types/enums';
import { InputChangeHandler } from '../../../types/types';
import UpdateUserInput from './UpdateUserInput';

export interface BaseUpdateUserProps {
  id: ColumnKey;
  isFormDirty: boolean;
  language: Record<string, string>;
  roleValue: Roles;
  submitBtnLabel: string;
  value: string;
  onSave: () => void;
}

interface UpdateUserProps extends BaseUpdateUserProps {
  ariaLabel: string;
  onUpdateChange: InputChangeHandler;
  onOpenPopup: () => void;
}

const UpdateUser = ({
  onOpenPopup,
  id,
  onSave,
  onUpdateChange,
  language,
  value,
  ariaLabel,
  isFormDirty,
  roleValue,
  submitBtnLabel,
}: UpdateUserProps) => (
  <Popup
    onOpenPopup={onOpenPopup}
    popupContent={({ close }) => (
      <UpdateUserInput
        submitBtnLabel={submitBtnLabel}
        labelText={id}
        language={language}
        onSave={() => {
          onSave();
          close();
        }}
        onCancel={close}
        onUpdateChange={onUpdateChange}
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
