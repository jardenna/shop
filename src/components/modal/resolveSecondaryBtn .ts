import { BtnVariant } from '../../types/enums';
import type { SecondaryActionBtnProps } from './Modal';

type ResolveSecondaryBtnProps = {
  label: string;
  action?: SecondaryActionBtnProps | null;
  onCloseModal: () => void;
};

const resolveSecondaryBtn = ({
  action,
  label,
  onCloseModal,
}: ResolveSecondaryBtnProps) => {
  // case 1: null → explicitly no button
  if (action === null) {
    return null;
  }

  // case 2: undefined → default cancel (close only)
  if (action === undefined) {
    return {
      label,
      variant: BtnVariant.Secondary,
      onClick: onCloseModal,
    };
  }

  // case 3: custom config (empty object counts as custom too)
  return {
    label: action.label ?? label,
    variant: action.variant ?? BtnVariant.Secondary,
    onClick: () => {
      action.onClick?.();
      onCloseModal();
    },
  };
};

export default resolveSecondaryBtn;
