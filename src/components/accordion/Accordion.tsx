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
      title: 'Materiale og vaskeanvisning',
      content: (
        <>
          <p>
            <strong>{language.material}:</strong> {material}
          </p>
          <strong>Plejeanvisning:</strong>
          <ul className="product-care-info">
            <li>Må ikke bleges</li>
            <li>Ikke egnet til tørretumbler</li>
            <li>Maskinvask ved 40 °C</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Levering og betaling',
      content: (
        <>
          <p>
            <strong>Levering:</strong> Vi tilbyder sikker levering med
            omhyggelig emballering. Alle ordrer behandles inden for 1-2
            hverdage, og du modtager et trackinglink, så snart din ordre er
            afsendt.
          </p>
          <p>
            <strong>Betaling:</strong> Betaling kan ske med kreditkort eller
            MobilePay. Vi trækker først beløbet, når din ordre er afsendt.
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
