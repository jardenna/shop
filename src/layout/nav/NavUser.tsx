import { UserResponse } from '../../app/api/apiTypes/sharedApiTypes';
import Icon from '../../components/icons/Icon';
import { IconName } from '../../types/enums';

type NavUserProps = {
  currentUser: UserResponse;
};

const NavUser = ({ currentUser }: NavUserProps) => (
  <div className="user-container">
    <span className="user">
      <span className="user-icon">
        <Icon title="" iconName={IconName.User} />
      </span>
      <span className="user-text nav-text">
        <span className="text-bold">{currentUser.username}</span>
        <span>
          <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
        </span>
      </span>
    </span>
  </div>
);

export default NavUser;
