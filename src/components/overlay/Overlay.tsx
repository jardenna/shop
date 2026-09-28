import { useAnimate } from '../../hooks/useAnimate';
import './_overlay.scss';

interface OverlayProps {
  isOverlayShown: boolean;
}

const Overlay = ({ isOverlayShown }: OverlayProps) => {
  const { shouldRender, transitionState, onTransitionEnd } = useAnimate({
    isOpen: isOverlayShown,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`overlay transition ${transitionState}`}
      onTransitionEnd={onTransitionEnd}
    />
  );
};

export default Overlay;
