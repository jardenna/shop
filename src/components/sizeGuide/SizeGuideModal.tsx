import Modal from '../modal/Modal';
import SizeGuide from './SizeGuide';

interface SizeGuideModalProps {
  id: string;
  language: Record<string, string>;
}

const SizeGuideModal = ({ language, id }: SizeGuideModalProps) => (
  <Modal
    id={id}
    modalSize="medium"
    primaryActionBtn={{
      label: 'OK',
    }}
    modalHeaderText={language.sizeGuide}
  >
    <p>{language.sizeGuideInfo}</p>
    <SizeGuide />
  </Modal>
);

export default SizeGuideModal;
