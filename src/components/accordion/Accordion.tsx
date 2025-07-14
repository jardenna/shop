import { ReactNode } from 'react';
import './_accordion.scss';
import AccordionItem from './AccordionItem';

type AccordionItem = {
  content: ReactNode;
  title: string;
};

type AccordionProps = {
  accordionItems: AccordionItem[];
};

const Accordion = ({ accordionItems }: AccordionProps) => (
  <section className="accordion-container">
    {accordionItems.map(({ title, content }) => (
      <AccordionItem key={title} title={title} detailsName="product-info">
        {content}
      </AccordionItem>
    ))}
  </section>
);

export default Accordion;
