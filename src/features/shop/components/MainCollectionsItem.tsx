import { NavLink } from 'react-router';
import Picture from '../../../components/Picture';
import { ShopPath } from '../../../layout/nav/enums';
import { ImgExtention } from '../../../types/types';
import useLanguage from '../../language/useLanguage';

export type MainCollectionsBaseProps = {
  linkText: string;
  linkTo: ShopPath;
  title: string;
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
  imgPath,
  imgExtention = 'jpg',
}: MainCollectionsItemProps) => {
  const { language } = useLanguage();

  return (
    <section className="collections-item">
      <div className="collections-content">
        <h2 className="collections-title">{title}</h2>
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
    </section>
  );
};

export default MainCollectionsItem;
