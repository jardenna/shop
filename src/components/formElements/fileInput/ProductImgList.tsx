import { ReactNode } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../../types/enums';
import Dropdown from '../../dropdown/Dropdown';
import Icon from '../../icons/Icon';
import Img from '../../Img';

type ProductImgListProps = {
  ariaLabel: string;
  img: string;
  onClick: any;
  title: string;
  children?: ReactNode;
};

const ProductImgList = ({
  img,
  onClick,
  children,
  ariaLabel,
  title,
}: ProductImgListProps) => {
  const { language } = useLanguage();
  return (
    <li className="preview-item">
      <Img className="preview-img" src={img} alt="" />
      {children && children}
      <Dropdown
        ariaControls="delete-image"
        text={`${language.sureToDelete}?`}
        triggerBtnVariant={BtnVariant.Ghost}
        triggerBtnClassName="danger"
        onPrimaryClick={onClick}
        primaryBtnLabel={language.delete}
        primaryBtnVariant={BtnVariant.Danger}
        ariaLabel={ariaLabel}
      >
        <Icon iconName={IconName.Trash} title={title} ariaLabel={ariaLabel} />
      </Dropdown>
    </li>
  );
};

export default ProductImgList;
