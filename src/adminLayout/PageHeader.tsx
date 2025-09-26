import LinkButton from '../components/LinkButton';
import useLanguage from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';

type PageHeaderProps = {
  heading: string;
  linkText?: string;
  linkTo?: string;
};

const PageHeader = ({ heading, linkTo, linkText }: PageHeaderProps) => {
  const { language } = useLanguage();
  return (
    <LayoutElement className="page-header" ariaLabel={language.page}>
      <h1>{heading}</h1>
      {linkTo && linkText && <LinkButton linkTo={linkTo} linkText={linkText} />}
    </LayoutElement>
  );
};

export default PageHeader;
