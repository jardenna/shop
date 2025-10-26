import VisuallyHidden from './VisuallyHidden';

type LiveAnnouncementProps = {
  announce: boolean;
  infoText: string;
  ariaLiveText?: string;
};

const LiveAnnouncement = ({
  announce,
  infoText,
  ariaLiveText,
}: LiveAnnouncementProps) => (
  <>
    <p>{infoText}</p>
    {announce && (
      <VisuallyHidden as="p">
        <span aria-live="polite">{ariaLiveText || infoText}</span>
      </VisuallyHidden>
    )}
  </>
);

export default LiveAnnouncement;
