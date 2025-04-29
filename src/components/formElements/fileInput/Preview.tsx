import { PreviewImg } from '../../../hooks/useFormValidation';
import { BtnVariant, IconName } from '../../../types/enums';
import Button from '../../Button';
import Icon from '../../icons/Icon';
import Img from '../../Img';

type PreviewProps = {
  ariaLabel: string;
  previewData: PreviewImg[];
  title: string;
  onRemoveImg: () => void;
};

const Preview = ({
  onRemoveImg,
  ariaLabel,
  title,
  previewData,
}: PreviewProps) =>
  previewData.map((preview) => (
    <div key={preview.name} className="flex">
      <Img src={preview.url} alt="" />
      <div>
        <span>{preview.name}</span>
        <span>{preview.size}</span>
      </div>
      <Button
        variant={BtnVariant.Ghost}
        onClick={() => {
          onRemoveImg();
        }}
        ariaLabel={ariaLabel}
      >
        <Icon iconName={IconName.Close} title={title} />
      </Button>
    </div>
  ));

export default Preview;
