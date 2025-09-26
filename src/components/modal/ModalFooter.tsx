import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import type { PrimaryActionBtnProps, SecondaryActionBtnProps } from './Modal';

type ModalFooterProps = {
  ariaLabel: string;
  primaryActionBtn: PrimaryActionBtnProps & { closeOnClick?: boolean }; // new prop
  secondaryActionBtn?: SecondaryActionBtnProps;
  onCloseModal: () => void;
  onPrimaryClick?: () => void;
};

const ModalFooter = ({
  primaryActionBtn,
  secondaryActionBtn,
  onCloseModal,
  onPrimaryClick,
  ariaLabel,
}: ModalFooterProps) => (
  <LayoutElement as="footer" className="footer" ariaLabel={ariaLabel}>
    {secondaryActionBtn && (
      <Button
        onClick={secondaryActionBtn.onClick || onCloseModal}
        variant={secondaryActionBtn.variant || BtnVariant.Secondary}
      >
        {secondaryActionBtn.label}
      </Button>
    )}
    <Button
      onClick={onPrimaryClick}
      type={primaryActionBtn.buttonType}
      disabled={primaryActionBtn.disabled}
      className={primaryActionBtn.className}
      variant={primaryActionBtn.variant || BtnVariant.Primary}
    >
      {primaryActionBtn.label}
    </Button>
  </LayoutElement>
);
export default ModalFooter;
