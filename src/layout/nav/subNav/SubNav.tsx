import { useParams } from 'react-router';
import { useLanguage } from '../../../features/language/useLanguage';
import { useGetShopMenuQuery } from '../../../features/shop/shopApiSlice';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { SubBaseNavList } from '../navLists';
import './_sub-nav.scss';
import SubNavListDesktop from './SubNavListDesktop';
import SubNavListMobile from './SubNavListMobile';

interface SubNavProps {
  heading: string;
  isSubNavShown: boolean;
  subNavList: SubBaseNavList[];
  ariaControls?: string;
}

const SubNav = ({
  subNavList,
  heading,
  isSubNavShown,
  ariaControls,
}: SubNavProps) => {
  const { category } = useParams();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();

  const { data: subMenu, refetch: refetchSubMenu } = useGetShopMenuQuery(
    category ?? 'woman',
  );

  return (
    <div
      className={`sub-nav-container ${isSubNavShown ? 'shown' : ''}`}
      id={ariaControls}
    >
      {isMobileSize ? (
        subMenu && (
          <SubNavListMobile
            subNavList={subNavList}
            subMenu={subMenu}
            category={category ?? 'women'}
            onReset={() => refetchSubMenu()}
            language={language}
          />
        )
      ) : (
        <SubNavListDesktop
          subNavList={subNavList}
          heading={heading}
          language={language}
        />
      )}
    </div>
  );
};

export default SubNav;
