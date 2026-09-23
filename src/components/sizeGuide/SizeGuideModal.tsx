import PopModal from '../popModal/PopModal';
import SizeGuide from './SizeGuide';

interface SizeGuideModalProps {
  ariaControls: string;
  language: Record<string, string>;
  modalId: string;
}

const SizeGuideModal = ({
  language,
  modalId,
  ariaControls,
}: SizeGuideModalProps) => (
  <PopModal
    modalId={modalId}
    headerText={language.sizeGuide}
    modalSize="medium"
    showCloseIcon
    ariaControls={ariaControls}
  >
    <SizeGuide language={language} />
  </PopModal>
);

export default SizeGuideModal;
