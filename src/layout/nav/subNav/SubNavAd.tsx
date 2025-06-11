type SubNavAdProps = {
  heading: string;
};

const SubNavAd = ({ heading }: SubNavAdProps) => (
  <section>
    <h2>{heading}.</h2>
  </section>
);

export default SubNavAd;
