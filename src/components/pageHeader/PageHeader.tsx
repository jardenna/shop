import LayoutElement from '../../layout/LayoutElement';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LinkButton from '../LinkButton';
import './_page-header.scss';

type PageHeaderProps = {
  ariaLabelledby: string;
  heading: string;
  linkText?: string;
  linkTo?: string;
};

const PageHeader = ({
  heading,
  linkTo,
  linkText,
  ariaLabelledby,
}: PageHeaderProps) => (
  <LayoutElement className="page-header">
    <div>
      <Breadcrumbs currentLabel={heading} />
      <h1 id={ariaLabelledby}>{heading}</h1>
    </div>
    {linkTo && linkText && <LinkButton linkTo={linkTo} linkText={linkText} />}
  </LayoutElement>
);

export default PageHeader;
