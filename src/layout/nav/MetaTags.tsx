import { useEffect } from 'react';
import { useLocation } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { ShopPath } from './enums';

type MetaTagsProps = {
  description?: string;
  keywords?: string;
  metaTitle?: string;
};

const MetaTags = ({ description, keywords, metaTitle }: MetaTagsProps) => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  const getTitle = (pathname: string): string => {
    if (pathname === `/${ShopPath.Login}`) {
      return language.login;
    }
    if (pathname === '/') {
      return language.home;
    }
    if (metaTitle) {
      return metaTitle;
    }
    return '';
  };
  const pathInfo = getTitle(pathname);
  const title = language[pathInfo];

  useEffect(() => {
    document.title = `Fashion Fusion | ${title}`;
  }, [pathname, title]);

  return (
    <>
      <meta
        name="description"
        content={
          description ||
          'Elevate your style with our exclusive fashion shop. Browse through trendy outfits and accessories that cater to all tastes and preferences.'
        }
      />
      <meta name="keywords" content={keywords || 'Fashion'} />
    </>
  );
};

export default MetaTags;
