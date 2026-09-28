import { useAnimate } from '../../hooks/useAnimate';
import './_overlay.scss';

interface OverlayProps {
  isOpen: boolean;
}

const Overlay = ({ isOpen }: OverlayProps) => {
  const { shouldRender, transitionState, onTransitionEnd } = useAnimate({
    isOpen,
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
