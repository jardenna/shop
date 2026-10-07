import { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import Icon from '../../../components/icons/Icon';
import Popup from '../../../components/popup/Popup';
import { ColumnKey } from '../../../pages/users/UserPage';
import { BtnVariant, IconName } from '../../../types/enums';
import { InputChangeHandler } from '../../../types/types';
import UpdateUserInput from './UpdateUserInput';
import UserRowText from './UserRowText';

export interface BaseUserTablePopupProps {
  id: ColumnKey;
  isFormDirty: boolean;
  language: Record<string, string>;
  roleValue: Roles;
  submitBtnLabel: string;
  value: string;
  onSave: () => void;
}

interface UserTablePopupProps extends BaseUserTablePopupProps {
  ariaLabel: string;
  onUpdateChange: InputChangeHandler;
  text: string;
  onOpenPopup: () => void;
}

const UserTablePopup = ({
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
  text,
}: UserTablePopupProps) => (
  <>
    <UserRowText text={text} language={language} />
    <Popup
      className="update-user-popup"
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
  </>
);

export default UserTablePopup;
