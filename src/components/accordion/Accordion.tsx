import { ReactNode } from 'react';
import './_accordion.scss';
import AccordionItem from './AccordionItem';

export type AccordionList = {
  content: ReactNode;
  title: string;
  additionalTitle?: string | number;
};

type AccordionProps = {
  accordionList: AccordionList[];
};

const Accordion = ({ accordionList }: AccordionProps) => (
  <section className="accordion-container">
    {accordionList.map(({ title, content, additionalTitle }) => (
      <AccordionItem
        key={title}
        title={title}
        detailsName="product-info"
        additionalTitle={additionalTitle}
      >
        {content}
      </AccordionItem>
    ))}
  </section>
);

export default Accordion;
