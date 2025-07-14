import useLanguage from '../../features/language/useLanguage';
import './_accordion.scss';
import AccordionItem from './AccordionItem';

type AccordionProps = {
  description: string;
  material: string;
};

const Accordion = ({ description, material }: AccordionProps) => {
  const { language } = useLanguage();

  const accordionItems = [
    { title: language.description, content: <p>{description}</p> },
    {
      title: language.materialAndCare,
      content: (
        <>
          <p>
            <strong>{language.material}:</strong> {material}
          </p>
          <strong>{language.care}:</strong>
          <ul className="product-care-info">
            <li>Må ikke bleges</li>
            <li>Ikke egnet til tørretumbler</li>
            <li>Maskinvask ved 40 °C</li>
          </ul>
        </>
      ),
    },
    {
      title: language.paymentAndDelivery,
      content: (
        <>
          <p>
            <strong>{language.delivery}:</strong> {language.deliveryText}
          </p>
          <p>
            <strong>{language.payment}:</strong> {language.paymentText}
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="accordion-container">
      {accordionItems.map((item) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          detailsName="product-info"
        >
          {item.content}
        </AccordionItem>
      ))}
    </section>
  );
};

export default Accordion;
