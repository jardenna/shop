type NavAdProps = {
  heading: string;
  imageName: string;
  text?: string;
};

const NavAd = ({ heading, text, imageName }: NavAdProps) => (
  <li
    className="sub-nav-item sub-nav-ad"
    style={{ backgroundImage: `url(/images/adImages/${imageName}.avif` }}
  >
    <p className="ad-heading">{heading}</p>
    {text && <p>{text}</p>}
  </li>
);

export default NavAd;
