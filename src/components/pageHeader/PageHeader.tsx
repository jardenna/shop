import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LinkButton from '../LinkButton';
import './_page-header.scss';

type PageHeaderProps = {
  heading: string;
  linkText?: string;
  linkTo?: string;
};

const PageHeader = ({ heading, linkTo, linkText }: PageHeaderProps) => {
  const { language } = useLanguage();
  return (
    <div className="page-header-container">
      <Breadcrumbs currentLabel={heading} />
      <LayoutElement className="page-header" ariaLabel={language.page}>
        <h1>{heading}</h1>
        {linkTo && linkText && (
          <LinkButton linkTo={linkTo} linkText={linkText} />
        )}
      </LayoutElement>
    </div>
  );
};

export default PageHeader;
