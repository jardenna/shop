import { Placement } from '@popperjs/core';
import { useId, type ReactNode } from 'react';
import { useInitialFocus } from '../../hooks/useInitialFocus';
import { usePopup } from '../../hooks/usePopup';
import { BtnVariant, IconName } from '../../types/enums';
import { AriaHasPopup } from '../../types/types';
import Button from '../Button';
import './_action-nav.scss';
import ActionNavList from './ActionNavList';

export interface ActionNavItemProps {
  label: string;
  btnVariant?: BtnVariant;
  disabled?: boolean;
  iconName?: IconName;
  isActive?: boolean;
  onClick: () => void;
}

interface ActionNavBtnProps {
  actionNavDropdownList: ActionNavItemProps[];
  ariaHasPopup: AriaHasPopup;
  children: ReactNode;
  ariaLabel?: string;
  placement?: Placement;
  showArrow?: boolean;
  triggerBtnClassName?: string;
  triggerBtnVariant?: BtnVariant;
}

const ActionNavBtn = ({
  actionNavDropdownList,
  triggerBtnVariant = BtnVariant.Ghost,
  children,
  showArrow,
  placement,
  ariaLabel,
  ariaHasPopup,
  triggerBtnClassName,
}: ActionNavBtnProps) => {
  const dropdownId = useId();

  const {
    popupRef,
    popupIsOpen,
    togglePopupList,
    arrowRef,
    buttonRef,
    closePopup,
  } = usePopup({ placement });

  useInitialFocus({
    popupRef,
    enabled: popupIsOpen,
  });

  return (
    <div>
      <Button
        variant={triggerBtnVariant}
        onClick={togglePopupList}
        ariaExpanded={popupIsOpen || false}
        ariaHasPopup={ariaHasPopup}
        ariaControls={dropdownId}
        ariaLabel={ariaLabel}
        className={triggerBtnClassName}
        refCallback={(element) => {
          buttonRef.current = element;
        }}
      >
        {children}
      </Button>
      {popupIsOpen && (
        <div ref={popupRef} className="popup-container" id={dropdownId}>
          <ActionNavList
            defaultIndex={0}
            actionNavDropdownList={actionNavDropdownList}
            closePopup={closePopup}
          />
          {showArrow && (
            <span ref={arrowRef} className="popup-arrow" aria-hidden />
          )}
        </div>
      )}
    </div>
  );
};

export default ActionNavBtn;
