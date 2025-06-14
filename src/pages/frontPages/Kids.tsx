import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import Img from '../../components/Img';
import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Kids = () => {
  // const location = useLocation();

  const { language } = useLanguage();

  // const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <>
      {/* <nav className="breadcrumbs">
        <NavLink to={MainPath.Root}>Home</NavLink>

        {pathnames.map((path, index) => {
          const fullPath = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <div key={index}>
              {' > '}
              <NavLink to={fullPath}>{path}</NavLink>
            </div>
          );
        })}
      </nav> */}
      <Breadcrumbs />

      <Img src="/images/kids/kid_banner.png" alt="lots of kids" />
      <MainPageContainer heading={language.kids}>
        <section>Kids</section>
      </MainPageContainer>
    </>
  );
};

export default Kids;
