import { useKeyboardListNav } from '../../hooks/useKeyboardListNav';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Icon from '../icons/Icon';
import type { ActionNavItemProps } from './ActionNavBtn';

interface ActionNavListProps {
  actionNavDropdownList: ActionNavItemProps[];
  defaultIndex?: number;
  closePopup?: () => void;
}

const ActionNavList = ({
  actionNavDropdownList,
  defaultIndex,
  closePopup,
}: ActionNavListProps) => {
  const { itemRefs, handleKeyDown } = useKeyboardListNav({
    defaultIndex,
    actionNavDropdownList,
  });

  return (
    <ul>
      {actionNavDropdownList.map(
        (
          { label, onClick, btnVariant, disabled, isActive, iconName },
          index,
        ) => (
          <li key={label} className="action-nav-item">
            <Button
              variant={btnVariant || BtnVariant.Ghost}
              className={isActive ? 'active' : ''}
              onClick={() => {
                onClick();
                closePopup?.();
              }}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              refCallback={(element) => {
                itemRefs.current[index] = element;
              }}
            >
              <span>{label}</span>
              {iconName && <Icon iconName={iconName} />}
            </Button>
          </li>
        ),
      )}
    </ul>
  );
};

export default ActionNavList;
