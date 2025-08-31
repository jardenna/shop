import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import Icon from '../../components/icons/Icon';
import { IconName } from '../../types/enums';

type NavUserProps = {
  currentUser: UserResponse;
  iconTitle: string;
  isMenuCollapsed?: boolean;
};

const NavUser = ({ currentUser, iconTitle, isMenuCollapsed }: NavUserProps) => (
  <div className="user-container">
    <span className="user">
      <span className="user-icon">
        <Icon title={iconTitle} iconName={IconName.User} />
      </span>
      <span className="user-text nav-text">
        <span className="text-bold">{currentUser.username}</span>
        {!isMenuCollapsed && (
          <span>
            <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
          </span>
        )}
      </span>
    </span>
  </div>
);

export default NavUser;
