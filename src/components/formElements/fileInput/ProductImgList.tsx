import { ReactNode } from 'react';
import { IconName } from '../../../types/enums';
import IconBtn from '../../IconBtn';
import Img from '../../Img';

type ProductImgListProps = {
  ariaLabel: string;
  img: string;
  title: string;
  children?: ReactNode;
  isImgDisabled?: boolean;
  onClick: () => void;
};

const ProductImgList = ({
  ariaLabel,
  img,
  title,
  isImgDisabled,
  onClick,
  children,
}: ProductImgListProps) => (
  <li className={`preview-img-item ${isImgDisabled ? 'gray-scaled' : ''}`}>
    <Img src={img} alt="" className="preview-img" />
    <IconBtn
      onClick={onClick}
      className="delete-preview-btn"
      iconName={isImgDisabled ? IconName.Undo : IconName.Trash}
      title={title}
      ariaLabel={ariaLabel}
    />

    {children && children}
  </li>
);

export default ProductImgList;
