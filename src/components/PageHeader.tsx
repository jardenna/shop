import { Link } from 'react-router';

type PageHeaderProps = {
  heading: string;
  linkText?: string;
  linkTo?: string;
};

const PageHeader = ({ heading, linkTo, linkText }: PageHeaderProps) => (
  <div className="page-header ">
    <h1>{heading}</h1>
    {linkTo && <Link to={linkTo}>{linkText}</Link>}
  </div>
);

export default PageHeader;
