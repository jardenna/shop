import Modal from '../Modal/Modal';
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
  <Modal
    modalId={modalId}
    headerText={language.sizeGuide}
    modalSize="medium"
    showCloseBtn
    ariaControls={ariaControls}
  >
    <SizeGuide language={language} />
  </Modal>
);

export default SizeGuideModal;
