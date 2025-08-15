import useLanguage from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import LinkButton from './LinkButton';

type PageHeaderProps = {
  heading: string;
  linkText?: string;
  linkTo?: string;
};

const PageHeader = ({ heading, linkTo, linkText }: PageHeaderProps) => {
  const { language } = useLanguage();
  return (
    <LayoutElement className="page-header" ariaLabel={language.page}>
      <h1>{heading}</h1>aa
      {linkTo && linkText && <LinkButton linkTo={linkTo} linkText={linkText} />}
    </LayoutElement>
  );
};

export default PageHeader;
