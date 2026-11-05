import IconBtn from '../../components/IconBtn';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetReviewsCountQuery } from '../../features/reviews/reviewsApiSlice';
import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navLists';
import { IconName } from '../../types/enums';
import './_aside.scss';

interface AsideProps {
  ariaLabel: string;
  isShown: boolean;
  onTogglePanel: () => void;
}

const Aside = ({ onTogglePanel, isShown, ariaLabel }: AsideProps) => {
  const { currentUser } = useAuth();
  const { language } = useLanguage();

  const { data: reviewsCount } = useGetReviewsCountQuery();

  return (
    <aside className={`aside ${isShown ? 'collapsed' : ''}`}>
      <NavContainer
        navList={adminNavList}
        isMenuCollapsed={isShown}
        currentUser={currentUser}
        ariaLabel={language.main}
        className="admin-nav"
        reviewsCount={reviewsCount?.unreadCount}
      />
      <IconBtn
        onClick={onTogglePanel}
        ariaLabel={ariaLabel}
        iconName={IconName.ChevronLeft}
        ariaExpanded={!isShown}
      />
    </aside>
  );
};

export default Aside;
