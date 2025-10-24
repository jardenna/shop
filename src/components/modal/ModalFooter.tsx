import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import type { ModalActionBtns } from './Modal';
import resolveSecondaryBtn from './resolveSecondaryBtn ';

type ModalFooterProps = ModalActionBtns & {
  ariaLabel: string;
  onCloseModal: () => void;
  onPrimaryClick?: () => void;
};

const ModalFooter = ({
  primaryActionBtn,
  secondaryActionBtn,
  onCloseModal,
  onPrimaryClick,
  ariaLabel,
}: ModalFooterProps) => {
  const { language } = useLanguage();

  const secondaryBtn = resolveSecondaryBtn({
    action: secondaryActionBtn,
    label: language.cancel,
    onCloseModal,
  });

  return (
    <LayoutElement as="footer" className="footer" ariaLabel={ariaLabel}>
      {secondaryBtn && (
        <Button variant={secondaryBtn.variant} onClick={onCloseModal}>
          {secondaryBtn.label}
        </Button>
      )}
      <Button
        onClick={onPrimaryClick}
        type={primaryActionBtn.buttonType}
        disabled={primaryActionBtn.disabled}
        showBtnLoader={primaryActionBtn.showBtnLoader}
        className={primaryActionBtn.className}
        variant={primaryActionBtn.variant || BtnVariant.Primary}
      >
        {primaryActionBtn.label}
      </Button>
    </LayoutElement>
  );
};

export default ModalFooter;
