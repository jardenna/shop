import { ReactNode } from 'react';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';

type AccordionItemProps = {
  children: ReactNode | string;
  title: string;
  additionalTitle?: string | number;
  detailsName?: string;
  open?: boolean;
};

const AccordionItem = ({
  detailsName,
  title,
  children,
  additionalTitle,
  open,
}: AccordionItemProps) => (
  <details name={detailsName} open={open || undefined}>
    <summary>
      <div>
        {title}
        {additionalTitle && <span>{additionalTitle}</span>}
      </div>
      <Icon
        iconName={IconName.ChevronDown}
        title=""
        className="accordion-icon"
      />
    </summary>
    <div className="accordion-content">{children}</div>
  </details>
);

export default AccordionItem;
