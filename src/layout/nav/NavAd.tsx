import ImageBackground from '../../components/imageBackground/ImageBackground';

type NavAdProps = {
  heading: string;
  imageName: string;
  text?: string;
};

const NavAd = ({ heading, text, imageName }: NavAdProps) => (
  <ImageBackground
    className="sub-nav-ad"
    as="li"
    srcSet={`/images/adImages/${imageName}.avif`}
    src={`/images/adImages/${imageName}.png`}
    alt="alt"
  >
    <div className="nav-ad-content">
      <h3>{heading}</h3>
      {text && <p>{text}.</p>}
    </div>
  </ImageBackground>
);

export default NavAd;
