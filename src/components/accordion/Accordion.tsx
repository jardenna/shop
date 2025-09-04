import { ReactNode } from 'react';
import './_accordion.scss';
import AccordionItem from './AccordionItem';

export type AccordionItem = {
  content: ReactNode;
  title: string;
  additionalTitle?: string | number;
};

type AccordionProps = {
  accordionItems: AccordionItem[];
};

const Accordion = ({ accordionItems }: AccordionProps) => (
  <section className="accordion-container">
    {accordionItems.map(({ title, content, additionalTitle }) => (
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
