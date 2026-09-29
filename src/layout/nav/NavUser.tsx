import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import Icon from '../../components/icons/Icon';
import VisuallyHidden from '../../components/VisuallyHidden';
import { IconName } from '../../types/enums';

type NavUserProps = {
  currentUser: UserResponse;
  isMenuCollapsed?: boolean;
};

const NavUser = ({ currentUser, isMenuCollapsed }: NavUserProps) => (
  <a href={`mailto:${currentUser.email}`} className="user-container">
    <Icon iconName={IconName.User} />

    {isMenuCollapsed && (
      <VisuallyHidden>{`Send e-mail til ${currentUser.email}`}</VisuallyHidden>
    )}
    {!isMenuCollapsed && (
      <span className="user-text">
        <span className="text-bold">{currentUser.username}</span>
        <span>{currentUser.email}</span>
      </span>
    )}
  </a>
);

export default NavUser;
