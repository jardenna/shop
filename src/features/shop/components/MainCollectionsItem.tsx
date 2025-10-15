import { NavLink } from 'react-router';
import Picture from '../../../components/Picture';
import { ShopPath } from '../../../layout/nav/enums';
import type { ImgExtention } from '../../../types/types';
import useLanguage from '../../language/useLanguage';

export type MainCollectionsBaseProps = {
  linkText: string;
  linkTo: ShopPath;
  title: string;
  ariaLabelledby?: string;
  imgExtention?: ImgExtention;
  imgList?: string[];
};

type MainCollectionsItemProps = MainCollectionsBaseProps & {
  imgPath: string;
};

const MainCollectionsItem = ({
  title,
  imgList,
  linkTo,
  linkText,
  ariaLabelledby,
  imgPath,
  imgExtention = 'jpg',
}: MainCollectionsItemProps) => {
  const { language } = useLanguage();

  return (
    <article className="collections-item" aria-labelledby={ariaLabelledby}>
      <div className="collections-content">
        <h2 id={ariaLabelledby} className="collections-title">
          {title}
        </h2>
        <NavLink className="btn btn-primary" to={linkTo}>
          {linkText}
        </NavLink>
      </div>
      {imgList && (
        <div className="collections-img-container">
          {imgList.map((imgSrc) => (
            <Picture
              key={imgSrc}
              srcSet={`${imgPath}/${imgSrc}.avif`}
              alt={language[`${imgSrc}AltText`]}
              src={`${imgPath}/${imgSrc}.${imgExtention}`}
            />
          ))}
        </div>
      )}
    </article>
  );
};

export default MainCollectionsItem;
