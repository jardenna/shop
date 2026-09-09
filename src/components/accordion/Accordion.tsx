import type { ReactNode } from 'react';
import './_accordion.scss';
import AccordionItem from './AccordionItem';

export type AccordionList = {
  content: ReactNode;
  title: string;
  additionalTitle?: string | number;
};

type AccordionProps = {
  accordionList: AccordionList[];
  name?: string; // undefined = independent toggle, same name = native accordion group
};

const Accordion = ({ accordionList, name }: AccordionProps) => (
  <div className="accordion">
    {accordionList.map(({ title, content, additionalTitle }) => (
      <AccordionItem
        key={title}
        title={title}
        additionalTitle={additionalTitle}
        name={name}
      >
        {content}
      </AccordionItem>
    ))}
  </div>
);

export default Accordion;
