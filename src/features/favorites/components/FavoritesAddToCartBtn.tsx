import type { UserResponse } from '../../../app/api/apiTypes/userApiTypes';
import Button from '../../../components/Button';
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
}: FavoritesAddToCartBtnProps) => (
  <div className="favorites-cta">
    {countInStock === 0 ? (
      <NotifyMeForm
        options={[]}
        isOutOfStock
        currentUser={currentUser ?? null}
        btnVariant="secondary"
      />
    ) : (
      <Button
        onClick={() => {
          onOpenPanel(panelId);
        }}
        variant="secondary"
      >
        {btnLabel}
      </Button>
    )}
  </div>
);

export default FavoritesAddToCartBtn;
