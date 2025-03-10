import { FC, useRef, useState } from 'react';
import useLanguage from '../../features/language/useLanguage';
import useClickOutside from '../../hooks/useClickOutside';
import useKeyPress from '../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../types/enums';
import Button from '../Button';
import IconContent from '../IconContent';
import { IconName } from '../icons/Icon';
import './_dropdown-btn.scss';

export interface DropdownListProps {
  id: number;
  label: string;
  onClick: () => void;
}

interface DropdownBtnProps {
  dropdownList: DropdownListProps[];
  username: string;
  btnVariant?: BtnVariant;
}

const DropdownBtn: FC<DropdownBtnProps> = ({
  username,
  dropdownList,
  btnVariant = BtnVariant.Ghost,
}) => {
  const { language } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  useKeyPress(() => {
    setDropdownIsOpen(false);
  }, [KeyCode.Esc]);
  useClickOutside(dropdownRef, () => {
    setDropdownIsOpen(false);
  });

  return (
    <section>
      <Button
        variant={btnVariant}
        onClick={() => {
          setDropdownIsOpen(!dropdownIsOpen);
        }}
        ariaExpanded={dropdownIsOpen}
        ariaHasPopup
      >
        <IconContent
          ariaLabel={language.myAccount}
          iconName={IconName.User}
          title={language.user}
        />
      </Button>
      {dropdownIsOpen && (
        <div className="dropdown-list" ref={dropdownRef}>
          <span>
            {language.welcome} {username}
          </span>
          <ul>
            {dropdownList.map(({ id, label, onClick }) => (
              <li key={id}>
                <Button variant={BtnVariant.Ghost} onClick={onClick}>
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default DropdownBtn;
