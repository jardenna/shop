import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import {
  MessagePopup,
  MessagePopupTypes,
} from '../../features/messagePopupSlice';
import { PopupRole } from '../../types/enums';
import BtnClose from '../BtnClose';
import Icon, { IconName } from '../icons/Icon';
import useMessagePopup from './useMessagePopup';

interface MessagePopupListItemProps {
  messagePopup: MessagePopup;
}

const MessagePopupListItem: FC<MessagePopupListItemProps> = ({
  messagePopup,
}) => {
  const { language } = useLanguage();
  const { deleteMessagePopup, popupClass } = useMessagePopup(messagePopup.id);
  const messagePopupTypeConfig: Record<
    MessagePopupTypes,
    { iconName: IconName; role: PopupRole; title: string }
  > = {
    success: {
      iconName: IconName.Success,
      title: language.success,
      role: PopupRole.Status,
    },
    info: {
      iconName: IconName.Info,
      title: language.information,
      role: PopupRole.Status,
    },
    warning: {
      iconName: IconName.Warning,
      title: language.warning,
      role: PopupRole.Alert,
    },
    error: {
      iconName: IconName.Error,
      title: language.error,
      role: PopupRole.Alert,
    },
  };

  const { iconName, title, role } =
    messagePopupTypeConfig[messagePopup.messagePopupType];
  return (
    <li
      role={role}
      className={`message-popup-item ${messagePopup.componentType || ''} animate-top-center ${popupClass} ${messagePopup.messagePopupType}`}
    >
      <span className="message-popup-item-info">
        <Icon iconName={iconName} title={title} />
        <p className="message-popup-message">{messagePopup.message}</p>
      </span>
      <BtnClose onClick={deleteMessagePopup} />
    </li>
  );
};

export default MessagePopupListItem;
