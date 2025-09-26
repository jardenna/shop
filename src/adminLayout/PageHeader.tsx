import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsListProps } from '../components/breadcrumbs/breadcrumbsLists';
import LinkButton from '../components/LinkButton';
import useLanguage from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';

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
