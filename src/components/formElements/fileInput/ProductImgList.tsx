import { ReactNode } from 'react';
import { IconName } from '../../../types/enums';
import IconBtn from '../../IconBtn';
import Img from '../../Img';

type ProductImgListProps = {
  ariaLabel: string;
  img: string;
  title: string;
  children?: ReactNode;
  className?: string;
  onClick: () => void;
};

const ProductImgList = ({
  img,
  onClick,
  children,
  ariaLabel,
  title,
  className,
}: ProductImgListProps) => (
  <li className="preview-item overlays">
    <Img className={`preview-img ${className}`} src={img} alt="" />
    {children && children}
    <IconBtn
      onClick={onClick}
      iconName={IconName.Trash}
      title={title}
      ariaLabel={ariaLabel}
    />
  </li>
);

export default ProductImgList;
