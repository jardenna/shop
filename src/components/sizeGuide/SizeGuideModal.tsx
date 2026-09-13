import Modal from '../modal/Modal';

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
    hello
  </Modal>
);

export default SizeGuideModal;
