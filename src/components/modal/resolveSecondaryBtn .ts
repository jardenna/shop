import { BtnVariant } from '../../types/enums';
import type { SecondaryActionBtnProps } from './Modal';

type SecondaryActionConfig = SecondaryActionBtnProps | null;

type ResolveSecondaryBtnProps = {
  label: string;
  props?: SecondaryActionConfig;
  onCloseModal: () => void;
};

const resolveSecondaryBtn = ({
  props,
  label,
  onCloseModal,
}: ResolveSecondaryBtnProps) => {
  // case 1: null → no button
  if (props === null) {
    return null;
  }

  // case 2: undefined → default cancel button
  if (props === undefined) {
    return {
      label,
      variant: BtnVariant.Secondary,
      onClick: onCloseModal,
    };
  }

  // case 3: custom config (empty object counts as custom too)
  return {
    label: props.label ?? label,
    variant: props.variant ?? BtnVariant.Secondary,
    onClick: props.onClick ?? onCloseModal,
  };
};

export default resolveSecondaryBtn;
