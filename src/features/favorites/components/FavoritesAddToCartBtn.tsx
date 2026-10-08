import { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import Button from '../../../components/Button';
import { BtnVariant } from '../../../types/enums';
import NotifyMeForm from '../../shop/components/NotifyMeForm';

interface FavoritesAddToCartBtnProps {
  btnLabel: string;
  countInStock: number;
  currentUser: UserResponse | null;
  panelId: string;
  onOpenPanel: (id: string) => void;
}

const FavoritesAddToCartBtn = ({
  onOpenPanel,
  btnLabel,
  countInStock,
  currentUser,
  panelId,
}: FavoritesAddToCartBtnProps) =>
  countInStock === 0 ? (
    <div className="in-stock-container">
      <NotifyMeForm
        options={[]}
        isOutOfStock
        currentUser={currentUser ?? null}
      />
    </div>
  ) : (
    <Button
      onClick={() => {
        onOpenPanel(panelId);
      }}
      variant={BtnVariant.Secondary}
    >
      {btnLabel}
    </Button>
  );

export default FavoritesAddToCartBtn;
