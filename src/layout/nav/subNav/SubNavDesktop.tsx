import { NavLink } from 'react-router';
import { LinkText } from '../enums';

type SubNavDesktopProps = {
  linkText: LinkText;
  linkTo: string;
  subNavHeading: string;
  subNavText: string;
  className?: string;
};

const SubNavDesktop = ({
  linkText,
  subNavHeading,
  linkTo,
  subNavText,
  className,
}: SubNavDesktopProps) => (
  <li className={`sub-nav-item ${className}`}>
    <section className="sub-nav-content">
      <h2 className="sub-nav-heading">{subNavHeading}</h2>
      <p className="sub-nav-text">{subNavText}</p>
    </section>
    <div className="sub-nav-link">
      <NavLink to={linkTo} className="btn btn-primary">
        {linkText}
      </NavLink>
    </div>
  </li>
);

export default SubNavDesktop;
