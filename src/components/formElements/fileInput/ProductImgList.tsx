import { ReactNode } from 'react';
import { IconName } from '../../../types/enums';
import IconBtn from '../../IconBtn';
import Img from '../../Img';

type ProductImgListProps = {
  ariaLabel: string;
  children: ReactNode;
  img: string;
  title: string;
  onClick: () => void;
};

const ProductImgList = ({
  img,
  onClick,
  children,
  ariaLabel,
  title,
}: ProductImgListProps) => (
  <li className="preview-item">
    <Img className="preview-img" src={img} alt="" />
    {children}
    <IconBtn
      onClick={onClick}
      iconName={IconName.Trash}
      title={title}
      ariaLabel={ariaLabel}
    />
  </li>
);

export default ProductImgList;
