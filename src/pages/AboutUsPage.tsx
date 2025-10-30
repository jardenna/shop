import Img from '../components/Img';
import MainPageContainer from './pageContainer/MainPageContainer';

const AboutUsPage = () => (
  <MainPageContainer heading="about">
    <section>
      <Img src="/images/about/about.jpg" alt="" />
    </section>
  </MainPageContainer>
);

export default AboutUsPage;
