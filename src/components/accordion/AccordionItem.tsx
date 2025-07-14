import { ReactNode } from 'react';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';

type AccordionItemProps = {
  children: ReactNode | string;
  title: string;
  detailsName?: string;
  open?: boolean;
};

const AccordionItem = ({
  detailsName,
  title,
  children,
  open,
}: AccordionItemProps) => (
  <details name={detailsName} open={open || undefined}>
    <summary>
      {title} <Icon iconName={IconName.Add} title="" />
    </summary>
    <div className="accordion-content">{children}</div>
  </details>
);

export default AccordionItem;
