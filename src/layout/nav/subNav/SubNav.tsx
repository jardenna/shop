import Img from '../../../components/Img';
import './_sub-menu.scss';

const SubNav = () => (
  <div className="sub-menu-container">
    <article className="sub-menu">
      <section className="menu-ad">
        <div>
          <Img src="/images/ad.png" alt="man and woman" />
        </div>
        <div>
          <h2>Discover latest</h2>
          <p>og noget text</p>
        </div>
      </section>
      <section>2</section>
      <section>3</section>
      <section>4</section>
    </article>
  </div>
);

export default SubNav;
