import { FC, ReactNode, useRef, useState } from 'react';
import useLanguage from '../../features/language/useLanguage';
import useClickOutside from '../../hooks/useClickOutside';
import useKeyPress from '../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../types/enums';
import Button from '../Button';
import IconContent from '../IconContent';
import { IconName } from '../icons/Icon';
import './_dropdown-btn.scss';
import DropdownList from './DropdownList';

export interface DropdownItem {
  id: number;
  label: string;
  className?: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface DropdownBtnProps {
  ariaControls: string;
  dropdownList: DropdownItem[];
  username: string;
  btnVariant?: BtnVariant;
}

const DropdownBtn: FC<DropdownBtnProps> = ({
  dropdownList,
  btnVariant = BtnVariant.Ghost,
  ariaControls,
}) => {
  const { language } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useKeyPress(() => {
    setDropdownIsOpen(false);
  }, [KeyCode.Esc]);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useClickOutside(dropdownRef, () => {
    setDropdownIsOpen(false);
  }, [buttonRef]);

  return (
    <div>
      <Button
        variant={btnVariant}
        ref={(el) => {
          buttonRef.current = el;
        }}
        onClick={() => {
          setDropdownIsOpen(!dropdownIsOpen);
        }}
        ariaExpanded={dropdownIsOpen}
        ariaHasPopup
        ariaControls={ariaControls}
      >
        <IconContent
          ariaLabel={language.myAccount}
          iconName={IconName.User}
          title={language.user}
        />
      </Button>
      {dropdownIsOpen && (
        <DropdownList
          dropdownList={dropdownList}
          ref={dropdownRef}
          ariaControls={ariaControls}
        />
      )}
    </div>
  );
};

export default DropdownBtn;
