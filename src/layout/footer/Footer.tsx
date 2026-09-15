import IconContent from '../../components/IconContent';
import { IconName } from '../../types/enums';
import LayoutElement from '../LayoutElement';

const Footer = () => (
  <LayoutElement ariaLabel="main" as="footer">
    <section>
      <article>Vores</article>
      <article>Vores</article>
      <article>
        <IconContent iconName={IconName.Facebook} ariaLabel="Facebook" />
      </article>
    </section>
  </LayoutElement>
);

export default Footer;
