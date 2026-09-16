import { useId } from 'react';
import ImageTextGrid from '../components/imageTextGrid/ImageTextGrid';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../features/language/useLanguage';
import MetaTags from '../layout/MetaTags';

const AboutUsPage = () => {
  const { language } = useLanguage();
  const aboutId = useId();

  const heading = language.about;
  return (
    <>
      <MetaTags metaTitle={heading} />
      <div aria-labelledby={aboutId} className="about-page">
        <PageHeader heading={heading} ariaLabelledby={aboutId} />
        <div className="image-text-grid-container">
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
            heading="Our collection"
            src="/images/about/about_us_1"
            alt=""
          >
            <h3>We focus on quality</h3>
            <p>
              Our collection is built around versatile pieces that can be worn,
              combined and enjoyed season after season. We focus on quality,
              thoughtful design and styles that fit naturally into everyday
              life.
            </p>
          </ImageTextGrid>
          <ImageTextGrid
            heading="Our approach"
            src="/images/about/about_us_2"
            alt=""
          >
            <h3>We aim to make every part of the experience clear</h3>
            <p>
              We want shopping online to be simple and enjoyable. From
              discovering new styles to receiving your order, we aim to make
              every part of the experience clear, convenient and accessible.
            </p>
          </ImageTextGrid>
          <ImageTextGrid
            heading="Made for everyday"
            src="/images/about/about_us_3"
            alt=""
          >
            <h3>We choose pieces that are designed for real life</h3>
            <p>
              Fashion should work for real life. That is why we choose pieces
              that are easy to wear, easy to combine and designed to become part
              of your wardrobe.
            </p>
          </ImageTextGrid>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
