import type { MessagePopupTypes } from '../../features/messagePopupSlice';
import { MessagePopup } from '../../features/messagePopupSlice';
import { IconName, PopupRole } from '../../types/enums';
import BtnClose from '../BtnClose';
import Icon from '../icons/Icon';
import useMessagePopup from './useMessagePopup';

type MessagePopupListItemProps = {
  messagePopup: MessagePopup;
};

const MessagePopupListItem = ({ messagePopup }: MessagePopupListItemProps) => {
  const { deleteMessagePopup, popupClass } = useMessagePopup(messagePopup.id);
  const messagePopupTypeConfig: Record<
    MessagePopupTypes,
    { iconName: IconName; role: PopupRole }
  > = {
    success: {
      iconName: IconName.Success,
      role: PopupRole.Status,
    },
    info: {
      iconName: IconName.Info,
      role: PopupRole.Status,
    },
    warning: {
      iconName: IconName.Warning,
      role: PopupRole.Alert,
    },
    error: {
      iconName: IconName.Error,
      role: PopupRole.Alert,
    },
  };

  const { iconName, role } =
    messagePopupTypeConfig[messagePopup.messagePopupType ?? 'success'];

  return (
    <li
      role={role}
      className={`message-popup-item ${messagePopup.componentType || ''} animate-bottom-center ${popupClass} ${messagePopup.messagePopupType}`}
    >
      <span className="message-popup-item-info">
        <Icon iconName={iconName} />
        <p className="message-popup-message">
          {messagePopup.message}{' '}
          {messagePopup.count && messagePopup.count > 1 && messagePopup.count}
        </p>
      </span>
      <BtnClose onClick={deleteMessagePopup} />
    </li>
  );
};

export default MessagePopupListItem;
