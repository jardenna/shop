import { FC, ReactNode, useRef, useState } from 'react';
import useLanguage from '../../features/language/useLanguage';
import useClickOutside from '../../hooks/useClickOutside';
import useKeyPress from '../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../types/enums';
import Button from '../Button';
import { IconName } from '../icons/Icon';
import './_dropdown-btn.scss';
import DropdownList from './DropdownList';
import IconContent from '../IconContent';

export interface DropdownItem {
  id: number;
  label: string;
  className?: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface DropdownBtnProps {
  dropdownList: DropdownItem[];
  username: string;
  btnVariant?: BtnVariant;
}

const DropdownBtn: FC<DropdownBtnProps> = ({
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
    <div>
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
        <DropdownList dropdownList={dropdownList} ref={dropdownRef} />
      )}
    </div>
  );
};

export default DropdownBtn;
