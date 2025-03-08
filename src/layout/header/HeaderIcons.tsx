import { FC } from 'react';
import IconBtn from '../../components/IconBtn';
import Icon, { IconName } from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';

interface HeaderIconsProps {
  className?: string;
  onClick: () => void;
}

const HeaderIcons: FC<HeaderIconsProps> = ({ onClick }) => {
  const { language } = useLanguage();

  return (
    <section>
      <ul className="header-icon-list">
        <li className="header-icon">
          <IconBtn
            iconName={IconName.Search}
            title={language.search}
            onClick={onClick}
            ariaLabel={language.search}
          />
        </li>
        <li className="header-icon">
          <IconBtn
            iconName={IconName.User}
            title={language.user}
            onClick={onClick}
            ariaLabel={language.myAccount}
          />
        </li>
        <li className="header-icon">
          <IconBtn
            iconName={IconName.ShoppingBack}
            title={language.bag}
            onClick={onClick}
            ariaLabel={language.myBag}
          />
        </li>
        <li className="header-icon">
          <IconBtn
            iconName={IconName.Currency}
            title={language.currency}
            onClick={onClick}
            ariaLabel={language.currency}
          />
        </li>
        <li>
          <Icon iconName={IconName.Language} title="" />
        </li>
      </ul>
    </section>
  );
};

export default HeaderIcons;
