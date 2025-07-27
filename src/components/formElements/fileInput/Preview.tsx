import type { PreviewImg } from '../../../hooks/useFormValidation';
import ImgListItem from './ImgListItem';

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
  <ul className="img-list preview-list">
    {previewData.map((preview, index) => (
      <ImgListItem
        key={index}
        onClick={() => {
          onRemoveImg(preview.name);
        }}
        img={preview.url}
        ariaLabel={`${ariaLabel} ${preview.name}`}
        title={title}
      />
    ))}
  </ul>
);

export default Preview;
