import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { breadcrumbsListProps } from '../breadcrumbs/breadcrumbsLists';
import LinkButton from '../LinkButton';
import './_page-container.scss';

type PageHeaderProps = {
  heading: string;
  routeList: breadcrumbsListProps[];
  linkText?: string;
  linkTo?: string;
};

const PageHeader = ({
  heading,
  linkTo,
  linkText,
  routeList,
}: PageHeaderProps) => {
  const { language } = useLanguage();
  return (
    <div className="page-header-container">
      <Breadcrumbs routeList={routeList} currentLabel={heading} />
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
