import variables from '../scss/variables.module.scss';

type OptionSize = 'small' | '';

type ProductColorListProps = {
  colours: string[];
  count?: number;
  optionSize?: OptionSize;
};

const ProductColorList = ({
  colours,
  count,
  optionSize = '',
}: ProductColorListProps) => {
  console.log(colours.length, count);

  return (
    <ul className="color-list">
      {colours.map((colour) => (
        <li
          key={colour}
          style={{
            backgroundColor: colour,
            borderColor: colour === 'white' ? variables.colorIconBorder : '',
          }}
          className={`option-box ${optionSize}`}
        />
      ))}
    </ul>
  );
};

export default ProductColorList;
