import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import Icon from '../../components/icons/Icon';
import MailTo from '../../components/MailTo';
import { IconName } from '../../types/enums';

type NavUserProps = {
  currentUser: UserResponse;
  isMenuCollapsed?: boolean;
};

const NavUser = ({ currentUser, isMenuCollapsed }: NavUserProps) => (
  <div className="user-container">
    <span className="user">
      <span className="user-icon">
        <Icon iconName={IconName.User} />
      </span>
      <span className="user-text nav-text">
        <span className="text-bold">{currentUser.username}</span>
        {!isMenuCollapsed && <MailTo email={currentUser.email} />}
      </span>
    </span>
  </div>
);

export default NavUser;
