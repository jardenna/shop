import type { LinkProps } from 'react-router';
import { useLanguage } from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';
import LinkButton from './LinkButton';

interface PageHeaderProps {
  ariaLabelledby: string;
  heading: string;
  linkText?: string;
  linkTo?: string;
  state?: LinkProps['state'];
}

const PageHeader = ({
  heading,
  linkTo,
  linkText,
  ariaLabelledby,
  state,
}: PageHeaderProps) => {
  const { language } = useLanguage();

  return (
    <LayoutElement className="page-header" ariaLabel={language.page}>
      <div>
        <Breadcrumbs currentLabel={heading} />
        <h1 id={ariaLabelledby}>{heading}</h1>
      </div>
      {linkTo && linkText && (
        <LinkButton
          linkTo={linkTo}
          linkText={linkText}
          className="page-header-link"
          state={state}
        />
      )}
    </LayoutElement>
  );
};

export default PageHeader;
