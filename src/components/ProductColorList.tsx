import variables from '../scss/variables.module.scss';

type ProductColorListProps = {
  colours: string[];
};

const ProductColorList = ({ colours }: ProductColorListProps) => (
  <ul className="product-color-list">
    {colours.map((colour) => (
      <li
        key={colour}
        style={{
          backgroundColor: colour,
          borderColor: colour === 'white' ? variables.colorIconBorder : '',
        }}
        className="option-icon"
      />
    ))}
  </ul>
);

export default ProductColorList;
