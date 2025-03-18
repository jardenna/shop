import { FC } from 'react';
import Input from '../../../../components/formElements/Input';
import IconBtn from '../../../../components/IconBtn';
import { IconName } from '../../../../types/enums';
import useLanguage from '../../../language/useLanguage';

interface UserRoleCellProps {
  role: string;
  value: string;
  onChange: (e: any) => void;
}

const UserRoleCell: FC<UserRoleCellProps> = ({ role, value, onChange }) => {
  const { language } = useLanguage();
  return (
    <td className="user-role-cell">
      <span className="role">{role}</span>
      <IconBtn
        iconName={IconName.Edit}
        className="danger"
        title={language.trashCan}
        ariaLabel={language.deleteCustomer}
        onClick={() => {
          console.log(12);
        }}
      />
      <form>
        <Input
          name="username"
          id="username"
          value={value}
          labelText={language.username}
          inputHasNoLabel
          onChange={onChange}
        />
      </form>
    </td>
  );
};

export default UserRoleCell;
