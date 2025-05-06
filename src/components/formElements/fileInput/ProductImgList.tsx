import { ReactNode } from 'react';
import { BtnVariant, IconName } from '../../../types/enums';
import Button from '../../Button';
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
}: ProductImgListProps) => (
  <li className="preview-item">
    <Img className="preview-img" src={img} alt="" />
    {children && children}
    <Button
      variant={BtnVariant.Ghost}
      onClick={onClick}
      ariaLabel={ariaLabel}
      className="danger"
    >
      <Icon iconName={IconName.Trash} title={title} />
    </Button>
  </li>
);

export default ProductImgList;
