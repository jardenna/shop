import type { ReactNode } from 'react';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';

type AccordionItemProps = {
  children: ReactNode | string;
  title: string;
  additionalTitle?: string | number;
  open?: boolean;
};

const AccordionItem = ({
  title,
  children,
  additionalTitle,
  open,
}: AccordionItemProps) => (
  <details open={open || undefined}>
    <summary>
      <span className="accordion-title">
        {title}
        {additionalTitle && <span>[{additionalTitle}]</span>}
      </span>
      <Icon iconName={IconName.ChevronDown} className="accordion-icon" />
    </summary>
    <div className="accordion-content">{children}</div>
  </details>
);

export default AccordionItem;
