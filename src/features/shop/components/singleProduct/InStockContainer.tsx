import { UserResponse } from '../../../../app/api/apiTypes/adminApiTypes';
import { Size } from '../../../../app/api/apiTypes/sharedApiTypes';
import InStock from '../InStock';
import NotifyMeForm from '../NotifyMeForm';

interface InStockContainerProps {
  countInStock: number;
  currentUser: UserResponse | null;
  missingSizes: Size[];
}

const InStockContainer = ({
  countInStock,
  missingSizes,
  currentUser,
}: InStockContainerProps) => (
  <div className="in-stock-container">
    <InStock stock={countInStock} />
    {(missingSizes.length > 0 || countInStock === 0) && (
      <NotifyMeForm
        options={missingSizes}
        isOutOfStock={countInStock === 0}
        currentUser={currentUser}
      />
    )}
  </div>
);

export default InStockContainer;
