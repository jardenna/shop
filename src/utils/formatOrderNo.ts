export const formatOrderNumber = (orderIdentifier: string) =>
  `#${orderIdentifier.slice(-6).toUpperCase()}`;
