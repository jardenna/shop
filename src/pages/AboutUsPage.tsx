import { useId } from 'react';
import ImageTextGrid from '../components/imageTextGrid/ImageTextGrid';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../features/language/useLanguage';
import MetaTags from '../layout/MetaTags';
import './AboutUsPage.styles.scss';

const AboutUsPage = () => {
  const { language } = useLanguage();
  const aboutId = useId();

  const heading = language.about;
  return (
    <>
      <MetaTags metaTitle={heading} />
      <div aria-labelledby={aboutId}>
        <PageHeader heading={heading} ariaLabelledby={aboutId} />
        <div className="about-us-page">
          <ImageTextGrid
            heading="Who we are"
            src="/images/about/about_us"
            alt=""
          >
            <h3>We believe great style should feel effortless</h3>
            <p>
              We are an independent online fashion store offering carefully
              selected clothing and accessories for modern wardrobes. We believe
              great style should feel effortless, accessible and easy to shop.
            </p>
          </ImageTextGrid>
          <ImageTextGrid
            heading="Who we are"
            src="/images/about/about_us"
            alt=""
          >
            <h3>We believe great style should feel effortless</h3>
            <p>
              We are an independent online fashion store offering carefully
              selected clothing and accessories for modern wardrobes. We believe
              great style should feel effortless, accessible and easy to shop.
            </p>
          </ImageTextGrid>
          {/* <section>
            <div>
              <h2>Who we are</h2>
              <h3>We believe great style should feel effortless</h3>
              <p>
                We are an independent online fashion store offering carefully
                selected clothing and accessories for modern wardrobes. We
                believe great style should feel effortless, accessible and easy
                to shop.
              </p>
            </div>
            <div>
              <Img src={src} alt="" />
            </div>
          </section>

          <section>
            <div>
              <h2>Our collection</h2>
              <p>
                Our collection is built around versatile pieces that can be
                worn, combined and enjoyed season after season. We focus on
                quality, thoughtful design and styles that fit naturally into
                everyday life.
              </p>

              <div>
                <Img src={src} alt="" />
              </div>
            </div>
          </section>

          <section>
            <div>
              <h2>Our approach</h2>
              <p>
                We want shopping online to be simple and enjoyable. From
                discovering new styles to receiving your order, we aim to make
                every part of the experience clear, convenient and accessible.
              </p>
            </div>
            <div>
              <Img src={src} alt="" />
            </div>
          </section>

          <section>
            <div>
              <h2>Made for everyday</h2>
              <p>
                Fashion should work for real life. That is why we choose pieces
                that are easy to wear, easy to combine and designed to become
                part of your wardrobe.
              </p>
            </div>
            <div>
              <Img src={src} alt="" />
            </div>
          </section> */}
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
