import LayoutElement from '../../layout/LayoutElement';
import { BtnType, BtnVariant } from '../../types/enums';
import Button from '../Button';
import { PrimaryActionBtnProps, SecondaryActionBtnProps } from './Modal';

type ModalFooterProps = {
  ariaLabel: string;
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryBtn?: SecondaryActionBtnProps | null;
  onPrimaryClick?: () => void;
};

const ModalFooter = ({
  primaryActionBtn,
  secondaryBtn,
  onPrimaryClick,
  ariaLabel,
}: ModalFooterProps) => (
  <LayoutElement as="footer" className="footer" ariaLabel={ariaLabel}>
    {secondaryBtn && (
      <Button
        variant={secondaryBtn.variant ?? BtnVariant.Secondary}
        onClick={secondaryBtn.onClick}
      >
        {secondaryBtn.label}
      </Button>
    )}

    <Button
      type={primaryActionBtn.buttonType}
      onClick={
        primaryActionBtn.buttonType === BtnType.Submit
          ? undefined
          : onPrimaryClick
      }
      disabled={primaryActionBtn.disabled}
      showBtnLoader={primaryActionBtn.showBtnLoader}
      className={primaryActionBtn.className}
      variant={primaryActionBtn.variant ?? BtnVariant.Primary}
    >
      {primaryActionBtn.label}
    </Button>
  </LayoutElement>
);

export default ModalFooter;
