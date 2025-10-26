import VisuallyHidden from '../../../components/VisuallyHidden';

type LiveAnnouncementProps = {
  announce: boolean;
  infoText: string;
  productsLoadedText: string;
};

const LiveAnnouncement = ({
  announce,
  infoText,
  productsLoadedText,
}: LiveAnnouncementProps) => (
  <>
    <p>{infoText}</p>
    {announce && (
      <VisuallyHidden as="p">
        <span aria-live="polite">
          {productsLoadedText} {infoText}
        </span>
      </VisuallyHidden>
    )}
  </>
);

export default LiveAnnouncement;
