import { ReactNode } from 'react';
import { NotifyMeModalProps } from '../../features/shop/components/ShopProductForm';
import { SizeVariant } from '../../types/enums';
import { OptionGroupHeading } from '../../types/types';
import { PrimaryActionBtnProps } from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';
import OptionGroupTitle from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  children: ReactNode;
  groupTitle?: OptionGroupHeading;
  primaryActionBtn?: PrimaryActionBtnProps;
  required?: boolean;
  triggerModal?: NotifyMeModalProps;
};

const ProductList = ({
  children,
  groupTitle,
  required,
  primaryActionBtn,
  triggerModal,
}: ProductListProps) => (
  <section className="product-list-container">
    {groupTitle && (
      <OptionGroupTitle groupTitle={groupTitle} required={required} />
    )}

    <ul className="product-list" id={groupTitle?.id}>
      {children}
    </ul>
    {triggerModal && (
      <ModalContainer
        triggerModalBtnContent={triggerModal.triggerModalBtnContent}
        triggerModalBtnVariant={triggerModal.triggerModalBtnVariant}
        id={triggerModal.modalId}
        primaryActionBtn={primaryActionBtn}
        modalSize={SizeVariant.Sm}
        modalHeaderText={triggerModal.modalHeaderText}
      >
        {triggerModal.modalText}
      </ModalContainer>
    )}
  </section>
);

export default ProductList;
