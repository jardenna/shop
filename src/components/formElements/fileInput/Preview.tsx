import { PreviewImg } from '../../../hooks/useFormValidation';
import { BtnVariant, IconName } from '../../../types/enums';
import Button from '../../Button';
import Icon from '../../icons/Icon';
import Img from '../../Img';

export type PreviewProps = {
  ariaLabel: string;
  previewData: PreviewImg[];
  title: string;
  onRemoveImg: (name: string) => void;
};

const Preview = ({
  onRemoveImg,
  ariaLabel,
  title,
  previewData,
}: PreviewProps) => (
  <ul className="preview-list">
    {previewData.map((preview) => (
      <li key={preview.name} className="preview-item">
        <Img className="preview-img" src={preview.url} alt="" />
        <div className="preview-info">
          <span>{preview.name}</span>
          <span className="preview-size">{preview.size}</span>
        </div>
        <Button
          variant={BtnVariant.Ghost}
          onClick={() => {
            onRemoveImg(preview.name);
          }}
          ariaLabel={ariaLabel}
        >
          <Icon iconName={IconName.Close} title={title} />
        </Button>
      </li>
    ))}
  </ul>
);

export default Preview;
