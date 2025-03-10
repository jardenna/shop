import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import IconContent from '../IconContent';
import { IconName } from '../icons/Icon';

interface DropdownBtnProps {
  username: string;
  btnVariant?: BtnVariant;
}

const DropdownBtn: FC<DropdownBtnProps> = ({
  username,
  btnVariant = BtnVariant.Ghost,
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    navigate(`/${MainPath.Login}`);
  };

  const dropdownList = [
    {
      label: language.myAccount,
      id: 1,
      onClick: () => {
        navigate(`/${MainPath.MyAccount}`);
      },
    },
    {
      label: language.myOrders,
      id: 2,
      onClick: () => {
        navigate(`/${MainPath.Orders}`);
      },
    },
  ];
  return (
    <section>
      <Button variant={btnVariant}>
        <IconContent
          ariaLabel={language.myAccount}
          iconName={IconName.User}
          title={language.user}
        />
      </Button>
      <span>Welcome {username}</span>
      <div>
        <Button onClick={handleLogout}>{language.logout}</Button>
        <ul>
          {dropdownList.map(({ id, label, onClick }) => (
            <li key={id}>
              <Button onClick={onClick}>{label}</Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DropdownBtn;
