import Img from '../components/Img';
import MainPageContainer from './pageContainer/MainPageContainer';
import RangeSlider from './rangeSlider/RangeSlider';

const AboutUsPage = () => (
  <MainPageContainer heading="about">
    <section>
      <RangeSlider />
      <Img src="/images/about/about.jpg" alt="" />
    </section>
  </MainPageContainer>
);

export default AboutUsPage;
