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
          heading={language.fashionGridNewHeading}
          linkTo="/"
          linkText={language.discoverCollection}
          subHading="NewArrivals"
          text={language.fashionGridNewText}
          alt={language.fashionGridSaleAltText}
        />
        <FashionGridItem
          className="grid-item-2"
          heading={language.shopMenHeading}
          linkTo={ShopPath.Men}
          linkText={language.fashionGridMenLink}
          text={language.fashionGridMenText}
          backgroundImageName="men"
          alt={language.fashionGridMenAltText}
        />
        <div className="grid-bottom">
          <FashionGridItem
            className="grid-item-3"
            heading={language.shopWomenHeading}
            linkTo={ShopPath.Women}
            linkText={language.fashionGridWomanLink}
            text={language.fashionGridWomanText}
            backgroundImageName="women"
            alt={language.fashionGridWomenAltText}
          />
          <FashionGridItem
            className="grid-item-4"
            heading={language.shopKidsHeading}
            linkTo={ShopPath.Kids}
            linkText={language.fashionGridKidsLink}
            text={language.fashionGridKidsText}
            backgroundImageName="kids"
            alt={language.fashionGridKidsAltText}
          />
        </div>
      </article>
    </section>
  );
};

export default FashionGrid;
