import Img from '../../../components/Img';
import useLanguage from '../../../features/language/useLanguage';
import './_fashion-grid.scss';

const FashionGrid = () => {
  const { language } = useLanguage();

  return (
    <section>
      <article className="fashion-grid">
        <section className="grid-item-1">
          <Img src="/images/home/topbanner1.png" alt="" />
          <div className="caption-text ">
            <h2>{language.shopNewHeading}</h2>

            <h3>NewArrivals</h3>

            <p className="banner_text">{language.shopNewText}</p>

            <a href="/collections/toddler-girl">{language.shopNewLink}</a>
          </div>
        </section>

        <section className="grid-item-2">
          <div className="caption-text ">
            <h2>{language.shopMenHeading}</h2>

            <h3>NewArrivals</h3>

            <p className="banner_text">{language.shopMenText}</p>

            <a href="/collections/toddler-girl">{language.shopMenLink}</a>
          </div>
        </section>
        <div className="grid-flex">
          <section className="grid-item-3">
            <div className="caption-text ">
              <h2>{language.shopWomanHeading}</h2>

              <h3>NewArrivals</h3>

              <p className="banner_text">{language.shopWomanText}</p>

              <a href="/collections/toddler-girl">{language.shopWomanLink}</a>
            </div>
          </section>

          <section className="grid-item-4">
            <div className="caption-text ">
              <h2>{language.shopKidsHeading}</h2>

              <h3>NewArrivals</h3>

              <p className="banner_text">{language.shopKidsText}</p>

              <a href="/collections/toddler-girl">{language.shopKidsLink}</a>
            </div>
          </section>
        </div>
      </article>
    </section>
  );
};

export default FashionGrid;
