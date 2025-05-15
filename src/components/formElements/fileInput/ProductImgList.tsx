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
  img,
  onClick,
  children,
  ariaLabel,
  title,
  isImgDisabled,
}: ProductImgListProps) => (
  <li className={`preview-item ${isImgDisabled ? 'gray-scaled' : ''}`}>
    <Img src={img} alt="" className="preview-img" />
    {children && children}
    <IconBtn
      onClick={onClick}
      iconName={isImgDisabled ? IconName.Undo : IconName.Trash}
      title={title}
      ariaLabel={ariaLabel}
    />
  </li>
);

export default ProductImgList;
