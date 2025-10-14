import LayoutElement from '../../layout/LayoutElement';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LinkButton from '../LinkButton';
import './_page-header.scss';

type PageHeaderProps = {
  heading: string;
  linkText?: string;
  linkTo?: string;
};

const PageHeader = ({ heading, linkTo, linkText }: PageHeaderProps) => (
  <section className="page-header-container">
    <Breadcrumbs currentLabel={heading} />
    <LayoutElement className="page-header">
      <h1>{heading}</h1>
      {linkTo && linkText && <LinkButton linkTo={linkTo} linkText={linkText} />}
    </LayoutElement>
  </section>
);

export default PageHeader;
