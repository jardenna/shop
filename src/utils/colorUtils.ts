const colorMap: Record<string, string> = {
  black: '#1f2937',
  grey: '#99a4a9',
  brown: '#531e0a',
  white: '#fff',
  blue: '#165272',
  yellow: '#facc15',
  orange: '#fb923c',
  red: '#db1139',
  purple: '#a0738f',
  green: '#3c763d',
  gold: '#d3af37',
  silver: '#d1d5db',
  pink: '#ec4899',
};

const colorList = [
  'black',
  'grey',
  'brown',
  'white',
  'blue',
  'yellow',
  'orange',
  'red',
  'purple',
  'green',
  'gold',
  'silver',
  'pink',
];

export type ColorOption = {
  color: string;
  label: string;
  value: string;
  border?: string;
};

type GetColorOptionsParams = {
  colors: string[];
  language: Record<string, string>;
  borderColor?: string;
};

const getColorOptions = ({
  colors,
  language,
  borderColor,
}: GetColorOptionsParams): ColorOption[] =>
  colors
    .filter((color) => colorMap[color] && language[color])
    .map((color) => ({
      label: language[color],
      value: color,
      color: colorMap[color],
      ...(colorMap[color] === '#fff' && borderColor && { border: borderColor }),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

export { colorList, colorMap, getColorOptions };
