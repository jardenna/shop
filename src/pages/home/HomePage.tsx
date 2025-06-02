import FashionGrid from './fashionGrid/FashionGrid';
import Hero from './Hero';

const HomePage = () => (
  <section className="container">
    <Hero />
    {/* <ul>
      <li>
        <div className="service_content">
          <div className="service_title1">Easy free delivery</div>
          <div className="service_title2">
            Online shopping from a great selection at free delivery
          </div>
        </div>
      </li>
      <li>
        <div className="service_content">
          <div className="service_title1">Easy free delivery</div>
          <div className="service_title2">
            Online shopping from a great selection at free delivery
          </div>
        </div>
      </li>
      <li>
        <div className="service_content">
          <div className="service_title1">Easy free delivery</div>
          <div className="service_title2">
            Online shopping from a great selection at free delivery
          </div>
        </div>
      </li>
      <li>
        <div className="service_content">
          <div className="service_title1">Easy free delivery</div>
          <div className="service_title2">
            Online shopping from a great selection at free delivery
          </div>
        </div>
      </li>
    </ul> */}
    <FashionGrid />
  </section>
);

export default HomePage;
