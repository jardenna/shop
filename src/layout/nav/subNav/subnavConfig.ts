type subnavConfigItem = {
  headingKey: string;
  textKey: string;
};

export const subNavConfig: Record<string, subnavConfigItem> = {
  kids: {
    headingKey: 'shopKidsHeading',
    textKey: 'shopKidsMenuText',
  },
  men: {
    headingKey: 'shopMenHeading',
    textKey: 'shopMenMenuText',
  },
  women: {
    headingKey: 'shopWomenHeading',
    textKey: 'shopWomenMenuText',
  },
};
