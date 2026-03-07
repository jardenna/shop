import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
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
  onReset?: () => void;
};

const Accordion = ({ accordionList, onReset, name }: AccordionProps) => (
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
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
  </ErrorBoundary>
);

export default Accordion;
