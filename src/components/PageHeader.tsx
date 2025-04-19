import { Link } from 'react-router';
import { MainPath } from '../layout/nav/enums';

type PageHeaderProps = {
  heading: string;
  linkText?: string;
  linkTo?: MainPath | string;
};

const PageHeader = ({ heading, linkTo, linkText }: PageHeaderProps) => (
  <div className="page-header ">
    <h1>{heading}</h1>
    {linkTo && <Link to={linkTo}>{linkText}</Link>}
  </div>
);

export default PageHeader;
