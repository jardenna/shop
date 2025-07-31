import { ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, SizeVariant } from '../../types/enums';
import { OptionGroupHeading } from '../../types/types';
import { PrimaryActionBtnProps } from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';
import OptionGroupTitle from './OptionGroupTitle';
import './_product-list.scss';

type ProductListProps = {
  children: ReactNode;
  categoryName?: string;
  groupTitle?: OptionGroupHeading;
  primaryActionBtn?: PrimaryActionBtnProps;
  required?: boolean;
};

const ProductList = ({
  children,
  groupTitle,
  required,
  primaryActionBtn,
  categoryName,
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
      {categoryName && (
        <ModalContainer
          triggerModalBtnContent="Notify me when missing sizes are back in stock"
          triggerModalBtnVariant={BtnVariant.Ghost}
          id={categoryName}
          primaryActionBtn={primaryActionBtn}
          modalSize={SizeVariant.Sm}
          modalHeaderText={`${language.size}  ${language.currentlyUnavailable}`}
        >
          {language.getNotifiedForProducts}?
        </ModalContainer>
      )}
    </section>
  );
};

export default ProductList;
