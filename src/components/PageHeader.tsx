import { Link } from 'react-router';
import useLanguage from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import { MainPath } from '../layout/nav/enums';

type PageHeaderProps = {
  heading: string;
  linkText?: string;
  linkTo?: MainPath | string;
};

const PageHeader = ({ heading, linkTo, linkText }: PageHeaderProps) => {
  const { language } = useLanguage();
  return (
    <LayoutElement as="header" className="page-header" ariaLabel={language.sub}>
      <h1>{heading}</h1>
      {linkTo && <Link to={linkTo}>{linkText}</Link>}
    </LayoutElement>
  );
};

export default PageHeader;
