import FashionGrid from './fashionGrid/FashionGrid';
import Hero from './Hero';

const HomePage = () => (
  <section>
    <Hero />

    <div className="container">
      <FashionGrid />
    </div>
  </section>
);

export default HomePage;
