import type { ReactNode } from 'react';
import { useLanguage } from '../../../features/language/useLanguage';
import IconBtn from '../../IconBtn';
import Img from '../../Img';
import Icon from '../../icons/Icon';

type ImgListItemProps = {
  ariaLabel: string;
  img: string;
  children?: ReactNode;
  isImgDisabled?: boolean;
  reason?: string;
  onClick: () => void;
};

const ImgListItem = ({
  ariaLabel,
  img,
  isImgDisabled,
  onClick,
  children,
  reason,
}: ImgListItemProps) => {
  const { language } = useLanguage();

  return (
    <li
      className={`img-list-item ${reason || isImgDisabled ? 'gray-scaled' : ''}`}
    >
      {reason && (
        <div className="invalid-file">
          <Icon iconName="error" />
          <span>{language[reason]}</span>
        </div>
      )}
      <Img src={img} alt="" className="img-list-img" />
      <IconBtn
        onClick={onClick}
        className="delete-img-list-btn"
        iconName={isImgDisabled ? 'undo' : 'trash'}
        ariaLabel={ariaLabel}
      />

      {children && children}
    </li>
  );
};

export default ImgListItem;
