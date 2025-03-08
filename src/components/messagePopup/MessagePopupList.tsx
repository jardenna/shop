import React from 'react';
import { MessagePopup } from '../../features/messagePopupSlice';
import Portal from '../Portal';
import './_message-popup.scss';
import MessagePopupListItem from './MessagePopupListItem';
import useMessagePopup from './useMessagePopup';

const MessagePopupList: React.FC = () => {
  const { messagePopups } = useMessagePopup();

  if (messagePopups.length === 0) {
    return null;
  }

  return (
    <Portal portalId="messagePopup">
      <ul className="message-popup-list">
        {messagePopups.map((messagePopup: MessagePopup) => (
          <MessagePopupListItem
            key={messagePopup.id}
            messagePopup={messagePopup}
          />
        ))}
      </ul>
    </Portal>
  );
};

export default MessagePopupList;
