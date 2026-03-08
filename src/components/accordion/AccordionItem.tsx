import type { ReactNode } from 'react';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';

type AccordionItemProps = {
  children: ReactNode | string;
  title: string;
  additionalTitle?: string | number;
  name?: string; // undefined = independent toggle, same name = native accordion group
  open?: boolean;
};

const AccordionItem = ({
  title,
  children,
  additionalTitle,
  open,
  name,
}: AccordionItemProps) => (
  <details open={open} name={name}>
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
