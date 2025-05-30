import './_fashion-grid.scss';

const FashionGrid = () => (
  <section>
    <article className="fashion-grid">
      <section className="grid-item-1">
        <div className="caption_text ">
          <h4>SPRiNG TIME COLLECTION</h4>

          <h2>NewArrivals</h2>

          <p className="banner_text">
            Season Sale!
            <br />
            <span>Save 50%</span> on all Items
          </p>

          <a className="btn" href="/collections/toddler-girl">
            Shop now!
          </a>
        </div>
      </section>

      <section className="grid-item-2">
        <div className="caption_text">
          <h2>
            Newborn <br />
            baby clothes
          </h2>

          <p className="banner_text">Limited time only!</p>

          <a className="btn" href="/collections/kid-boy">
            Shop now!
          </a>
        </div>
      </section>
      <div className="grid-flex">
        <section className="grid-item-3">
          <div className="caption_text ">
            <h4>SPRiNG TIME COLLECTION</h4>

            <h2>NewArrivals</h2>

            <p className="banner_text">
              Season Sale!
              <br />
              <span>Save 50%</span> on all Items
            </p>

            <a className="btn" href="/collections/toddler-girl">
              Shop now!
            </a>
          </div>
        </section>

        <section className="grid-item-4">
          <div className="caption_text ">
            <h4>SPRiNG TIME COLLECTION</h4>

            <h2>NewArrivals</h2>

            <p className="banner_text">
              Season Sale!
              <br />
              <span>Save 50%</span> on all Items
            </p>

            <a className="btn" href="/collections/toddler-girl">
              Shop now!
            </a>
          </div>
        </section>
      </div>
    </article>
  </section>
);

export default FashionGrid;
