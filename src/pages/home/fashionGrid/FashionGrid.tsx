import Img from '../../../components/Img';
import './_fashion-grid.scss';

const FashionGrid = () => (
  <section>
    <article className="fashion-grid">
      <section className="grid-item-1">
        <Img src="/images/home/topbanner1.png" alt="" />
        <div className="caption-text ">
          <h2>Celebrating life</h2>

          <h3>NewArrivals</h3>

          <p className="banner_text">
            Discover style made to move with your passions and celebrate what
            makes you unique.
          </p>

          <a href="/collections/toddler-girl">Discover Collection</a>
        </div>
      </section>

      <section className="grid-item-2">
        <div className="caption-text">
          <h2>Newborn baby clothes</h2>

          <p className="banner_text">Limited time only!</p>

          <a href="/collections/kid-boy">Shop now!</a>
        </div>
      </section>
      <div className="grid-flex">
        <section className="grid-item-3">
          <div className="caption-text ">
            <h4>SPRiNG TIME COLLECTION</h4>

            <h2>NewArrivals</h2>

            <p className="banner_text">
              Season Sale!
              <span>Save 50%</span> on all Items
            </p>

            <a href="/collections/toddler-girl">Shop now!</a>
          </div>
        </section>

        <section className="grid-item-4">
          <div className="caption-text ">
            <h4>SPRiNG TIME COLLECTION</h4>

            <h2>NewArrivals</h2>

            <p className="banner_text">
              Season Sale!
              <span>Save 50%</span> on all Items
            </p>

            <a href="/collections/toddler-girl">Shop now!</a>
          </div>
        </section>
      </div>
    </article>
  </section>
);

export default FashionGrid;
