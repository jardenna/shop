import { ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { ModalContainerProps } from '../../features/shop/components/ShopProductForm';
import { SizeVariant } from '../../types/enums';
import { OptionGroupHeading } from '../../types/types';
import { PrimaryActionBtnProps } from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';
import OptionGroupTitle from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  children: ReactNode;
  groupTitle?: OptionGroupHeading;
  modalId?: string;
  primaryActionBtn?: PrimaryActionBtnProps;
  required?: boolean;
  triggerModal?: ModalContainerProps;
};

const ProductList = ({
  children,
  groupTitle,
  required,
  primaryActionBtn,
  modalId,
  triggerModal,
}: ProductListProps) => {
  const { language } = useLanguage();
  return (
    <section className="product-list-container">
      {groupTitle && (
        <OptionGroupTitle groupTitle={groupTitle} required={required} />
      )}

      <ul className="product-list" id={groupTitle?.id}>
        {children}
      </ul>
      {modalId && triggerModal && (
        <ModalContainer
          triggerModalBtnContent={triggerModal.triggerModalBtnContent}
          triggerModalBtnVariant={triggerModal.triggerModalBtnVariant}
          id={modalId}
          primaryActionBtn={primaryActionBtn}
          modalSize={SizeVariant.Sm}
          modalHeaderText={triggerModal.modalHeaderText}
        >
          {language.getNotifiedForProducts}?
        </ModalContainer>
      )}
    </section>
  );
};

export default ProductList;
