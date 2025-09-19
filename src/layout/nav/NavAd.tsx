import ImageBackground from '../../components/imageBackground/ImageBackground';

type NavAdProps = {
  alt: string;
  heading: string;
  imageName: string;
  imgExtention?: 'png' | 'jpg' | 'WebP';
  text?: string;
};

const NavAd = ({
  heading,
  text,
  imageName,
  alt,
  imgExtention = 'jpg',
}: NavAdProps) => (
  <ImageBackground
    className="sub-nav-ad"
    as="li"
    srcSet={`/images/adImages/${imageName}.avif`}
    src={`/images/adImages/${imageName}.${imgExtention}`}
    alt={alt}
  >
    <div className="nav-ad-content">
      <h3>{heading}</h3>
      {text && <p>{text}.</p>}
    </div>
  </ImageBackground>
);

export default NavAd;
