import { ReactNode } from 'react';
import { IconName } from '../../../types/enums';
import IconBtn from '../../IconBtn';
import Img from '../../Img';

type ImgListProps = {
  ariaLabel: string;
  img: string;
  title: string;
  children?: ReactNode;
  isImgDisabled?: boolean;
  onClick: () => void;
};

const ImgList = ({
  ariaLabel,
  img,
  title,
  isImgDisabled,
  onClick,
  children,
}: ImgListProps) => (
  <li className={`img-list-item ${isImgDisabled ? 'gray-scaled' : ''}`}>
    <Img src={img} alt="" className="img-list-img" />
    <IconBtn
      onClick={onClick}
      className="delete-img-list-btn"
      iconName={isImgDisabled ? IconName.Undo : IconName.Trash}
      title={title}
      ariaLabel={ariaLabel}
    />

    {children && children}
  </li>
);

export default ImgList;
