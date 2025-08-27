import { NavLink } from 'react-router';
import Img from '../../../components/Img';
import { ShopPath } from '../../../layout/nav/enums';

export type MainCollectionsItemProps = {
  linkText: string;
  linkTo: ShopPath;
  src: string[];
  title: string;
};

const MainCollectionsItem = ({
  title,
  src,
  linkTo,
  linkText,
}: MainCollectionsItemProps) => (
  <section className="collections-item">
    <div className="collections-content">
      <h2 className="collections-title">{title}</h2>
      <NavLink className="btn btn-primary" to={linkTo}>
        {linkText}
      </NavLink>
    </div>

    <div className="collections-img-container">
      {src.map((s) => (
        <Img key={s} src={s} alt="" />
      ))}
    </div>
  </section>
);

export default MainCollectionsItem;
