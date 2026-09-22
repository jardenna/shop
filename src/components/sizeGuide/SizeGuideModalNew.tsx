import PopModal from '../popModal/PopModal';
import SizeGuide from './SizeGuide';

interface SizeGuideModalProps {
  language: Record<string, string>;
  modalId: string;
}

const SizeGuideModalNew = ({ language, modalId }: SizeGuideModalProps) => (
  <PopModal
    modalId={modalId}
    headerText={language.sizeGuide}
    modalSize="medium"
    showCloseIcon
  >
    <SizeGuide />
  </PopModal>
);

export default SizeGuideModalNew;
