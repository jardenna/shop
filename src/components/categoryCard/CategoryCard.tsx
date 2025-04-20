import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant, SizeVariant } from '../../types/enums';
import Badge from '../badge/Badge';
import DateDisplay from '../datePicker/DateDisplay';
import LinkButton from '../LinkButton';
import { SecondaryActionBtnProps } from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';
import './_category-card.scss';
import CategoryCardContent from './CategoryCardContent';

type CategoryCardProps = {
  categoryId: string;
  createdAt: Date;
  mainCategoryName: string;
  scheduledDate: Date | null;
  showStatusMessage: boolean;
  status: string;
  statusMessage: string;
  subCategoryName: string;
  totalProducts: number;
  onDeleteSubCategory: () => void;
};

const CategoryCard = ({
  subCategoryName,
  totalProducts,
  createdAt,
  mainCategoryName,
  showStatusMessage,
  scheduledDate,
  statusMessage,
  status,
  categoryId,
  onDeleteSubCategory,
}: CategoryCardProps) => {
  const { language } = useLanguage();
  const primaryActionBtn = {
    onClick: onDeleteSubCategory,
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <div className="category-card-container">
      <CategoryCardContent className="left">
        <div className="position-relative">
          <Badge
            badgeText={language[status.toLocaleLowerCase()]}
            className={status.toLowerCase()}
          />
          <h2 className="category-card-title">{subCategoryName}</h2>

          <span>
            {language.totalProducts}: {totalProducts}
          </span>
        </div>

        <div>
          {scheduledDate && (
            <div className="category-date">
              <span>{subCategoryName} er planlagt til udgivelse den </span>
              <DateDisplay
                date={scheduledDate}
                hour="2-digit"
                minute="2-digit"
              />
            </div>
          )}
          <div className="footer-buttons">
            <ModalContainer
              triggerModalBtnContent={language.delete}
              triggerModalBtnVariant={BtnVariant.Danger}
              id={categoryId}
              primaryActionBtn={primaryActionBtn}
              secondaryActionBtn={secondaryActionBtn}
              modalSize={SizeVariant.Sm}
              modalHeaderText={language.deleteCategory}
            >
              {language.sureToDelete} {subCategoryName}
            </ModalContainer>
            <LinkButton
              linkTo={`/admin/${MainPath.AdminSubCategoryUpdate}/${categoryId}`}
              linkText={language.edit}
            />
          </div>
        </div>
      </CategoryCardContent>

      <CategoryCardContent className="right">
        <h2 className="category-card-title">{mainCategoryName}</h2>

        {showStatusMessage && (
          <div>
            <div className="category-card-text">
              <h3>
                {language.parentCategoryIs} {language[statusMessage]}
              </h3>
              {subCategoryName} {language.notVisibleInShop}.
            </div>
            <div>
              <LinkButton
                linkTo={`/admin/${MainPath.AdminCategories}`}
                linkText={language.publish}
              />
            </div>
          </div>
        )}

        <span className="category-date">
          {language.createdAt} <DateDisplay date={createdAt} />
        </span>
      </CategoryCardContent>
    </div>
  );
};
export default CategoryCard;
