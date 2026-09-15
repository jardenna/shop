import { useLanguage } from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const AboutUsPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.about}>
      <section>
        <h2>Who we are</h2>
        <p>
          We are an independent online fashion store offering carefully selected
          clothing and accessories for modern wardrobes. We believe great style
          should feel effortless, accessible and easy to shop.
        </p>
      </section>

      <section>
        <h2>Our collection</h2>
        <p>
          Our collection is built around versatile pieces that can be worn,
          combined and enjoyed season after season. We focus on quality,
          thoughtful design and styles that fit naturally into everyday life.
        </p>
      </section>

      <section>
        <h2>Our approach</h2>
        <p>
          We want shopping online to be simple and enjoyable. From discovering
          new styles to receiving your order, we aim to make every part of the
          experience clear, convenient and accessible.
        </p>
      </section>

      <section>
        <h2>Made for everyday</h2>
        <p>
          Fashion should work for real life. That is why we choose pieces that
          are easy to wear, easy to combine and designed to become part of your
          wardrobe.
        </p>
      </section>
    </MainPageContainer>
  );
};

export default AboutUsPage;
