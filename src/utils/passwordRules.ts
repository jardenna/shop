import { isNumber, isSymbol, lowercase, uppercase } from './regex';

export const passwordRules = (inputValue: string) => [
  { text: 'minLength', isValid: inputValue.length >= 8 },
  { text: 'mustHaveNumber', isValid: isNumber.test(inputValue) },
  { text: 'mustHaveLowercase', isValid: lowercase.test(inputValue) },
  { text: 'mustHaveUppercase', isValid: uppercase.test(inputValue) },
  { text: 'mustHaveSymbol', isValid: isSymbol.test(inputValue) },
];
