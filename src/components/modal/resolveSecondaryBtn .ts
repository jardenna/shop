import { BtnVariant } from '../../types/enums';
import { SecondaryActionBtnProps } from './Modal';

export type SecondaryActionConfig = SecondaryActionBtnProps | null | undefined;

const resolveSecondaryBtn = (
  props: SecondaryActionConfig,
  defaultLabel: string,
  onClose: () => void,
) => {
  // case 1: null → no button
  if (props === null) {
    return null;
  }

  // case 2: undefined → default cancel button
  if (props === undefined) {
    return {
      label: defaultLabel,
      variant: BtnVariant.Secondary,
      onClick: onClose,
    };
  }

  // case 3: custom config (empty object counts as custom too)
  return {
    label: props.label ?? defaultLabel,
    variant: props.variant ?? BtnVariant.Secondary,
    onClick: props.onClick ?? onClose,
  };
};

export default resolveSecondaryBtn;
