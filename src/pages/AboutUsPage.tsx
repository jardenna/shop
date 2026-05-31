import ConvertingGuide from '../components/ConvertingGuide';
import SizeGuide from '../components/SizeGuide';
import MainPageContainer from './pageContainer/MainPageContainer';

const AboutUsPage = () => (
  <MainPageContainer heading="about">
    <ConvertingGuide />
    <SizeGuide />
    <section>about</section>
  </MainPageContainer>
);

export default AboutUsPage;
