import { type ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function createWrapperAndAppendToBody(portalId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', portalId);
  document.body.append(wrapperElement);

  return wrapperElement;
}

type PortalProps = {
  children: ReactNode;
  portalId: string;
  className?: string;
};
const Portal = ({ children, portalId, className }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null,
  );

  useLayoutEffect(() => {
    let element: HTMLElement | null = document.getElementById(portalId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(portalId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [portalId]);

  if (wrapperElement === null) {
    return null;
  }

  return createPortal(
    <div className={className}>{children}</div>,
    wrapperElement,
  );
};

export default Portal;
