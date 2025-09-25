import FashionGrid from './fashionGrid/FashionGrid';
import Hero from './hero/Hero';

const HomePage = () => (
  <section className="container home-page">
    <Hero />
    <div className="home-page-container">
      <FashionGrid />
    </div>
  </section>
);

export default HomePage;
