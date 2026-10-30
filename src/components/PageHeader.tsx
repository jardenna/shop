import { useLanguage } from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';
import LinkButton from './LinkButton';

type PageHeaderProps = {
  ariaLabelledby: string;
  heading: string;
  hideBreadCrumbs?: boolean;
  linkText?: string;
  linkTo?: string;
};

const PageHeader = ({
  heading,
  linkTo,
  linkText,
  ariaLabelledby,
  hideBreadCrumbs,
}: PageHeaderProps) => {
  const { language } = useLanguage();

  return (
    <LayoutElement className="page-header" ariaLabel={language.page}>
      <div>
        {!hideBreadCrumbs && <Breadcrumbs currentLabel={heading} />}
        <h1 id={ariaLabelledby}>{heading}</h1>
      </div>
      {linkTo && linkText && (
        <LinkButton
          linkTo={linkTo}
          linkText={linkText}
          className="page-header-link"
        />
      )}
    </LayoutElement>
  );
};

export default PageHeader;
