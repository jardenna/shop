import useLanguage from '../../../features/language/useLanguage';
import { ShopPath } from '../../../layout/nav/enums';
import './_fashion-grid.scss';
import FashionGridItem from './FashionGridItem';

const FashionGrid = () => {
  const { language } = useLanguage();

  return (
    <section>
      <article className="fashion-grid">
        <FashionGridItem
          className="grid-item-1"
          heading={language.shopNewHeading}
          linkTo="/"
          linkText={language.discoverCollection}
          subHading="NewArrivals"
        >
          <p>{language.shopNewText}</p>
        </FashionGridItem>
        <FashionGridItem
          className="grid-item-2"
          heading={language.shopMenHeading}
          linkTo={ShopPath.Men}
          linkText={language.shopMenLink}
        >
          <p>{language.shopMenText}</p>
        </FashionGridItem>

        <div className="grid-flex">
          <FashionGridItem
            className="grid-item-3"
            heading={language.shopWomanHeading}
            linkTo={ShopPath.Women}
            linkText={language.shopWomanLink}
          >
            <p>{language.shopWomanText}</p>
          </FashionGridItem>
          <FashionGridItem
            className="grid-item-4"
            heading={language.shopKidsHeading}
            linkTo={ShopPath.Kids}
            linkText={language.shopKidsLink}
          >
            <p>{language.shopKidsText}</p>
          </FashionGridItem>
        </div>
      </article>
    </section>
  );
};

export default FashionGrid;
