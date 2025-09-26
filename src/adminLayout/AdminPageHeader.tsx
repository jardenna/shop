import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { adminBreadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import LinkButton from '../components/LinkButton';
import useLanguage from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';

type AdminPageHeaderProps = {
  heading: string;
  linkText?: string;
  linkTo?: string;
};

const AdminPageHeader = ({
  heading,
  linkTo,
  linkText,
}: AdminPageHeaderProps) => {
  const { language } = useLanguage();
  return (
    <>
      <Breadcrumbs routeList={adminBreadcrumbsList} currentLabel={heading} />
      <LayoutElement className="admin-page-header" ariaLabel={language.page}>
        <h1>{heading}</h1>
        {linkTo && linkText && (
          <LinkButton linkTo={linkTo} linkText={linkText} />
        )}
      </LayoutElement>
    </>
  );
};

export default AdminPageHeader;
