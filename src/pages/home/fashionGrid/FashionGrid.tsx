import useLanguage from '../../../features/language/useLanguage';
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
          linkText={language.shopNewLink}
          subHading="NewArrivals"
        >
          <p>{language.shopNewText}</p>
        </FashionGridItem>
        <FashionGridItem
          className="grid-item-2"
          heading={language.shopMenHeading}
          linkTo="/"
          linkText={language.shopMenLink}
        >
          <p>{language.shopMenText}</p>
        </FashionGridItem>

        <div className="grid-flex">
          <FashionGridItem
            className="grid-item-3"
            heading={language.shopWomanHeading}
            linkTo="/"
            linkText={language.shopWomanLink}
          >
            <p>{language.shopWomanText}</p>
          </FashionGridItem>
          <FashionGridItem
            className="grid-item-4"
            heading={language.shopKidsHeading}
            linkTo="/"
            linkText={language.shopKidsLink}
          >
            <p>{language.shopWomanText}</p>
          </FashionGridItem>
        </div>
      </article>
    </section>
  );
};

export default FashionGrid;
