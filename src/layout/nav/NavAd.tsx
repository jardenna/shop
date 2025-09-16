type NavAdProps = {
  filePath: string;
  heading: string;
  text?: string;
};

const NavAd = ({ heading, text, filePath }: NavAdProps) => (
  <li
    className="sub-nav-item sub-nav-ad"
    style={{ backgroundImage: `url(${filePath})` }}
  >
    <p className="ad-heading">{heading}</p>
    {text && <p>{text}</p>}
  </li>
);

export default NavAd;
