import ControlList from '../../../../components/formElements/controlGroup/ControlList';
import { IconName } from '../../../../types/enums';
import { optionsList } from '../../../../utils/utils';

const Ratings = () => (
  <ControlList
    className="ratings"
    onChange={(e) => {
      console.log(e.target);
    }}
    options={optionsList(5)}
    name="star"
    variant="small"
    iconName={IconName.Star}
    groupTitle={{
      title: 'Ratings',
      id: 'ratings',
    }}
    type="checkbox"
  />
);
export default Ratings;
