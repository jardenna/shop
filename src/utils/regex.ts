const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const yearRegex = /^(18(8[9]|9[0-9])|19\d{2}|20\d{2}|2099)$/;
const lowercase = /[a-z]/;
const uppercase = /[A-Z]/;
const isNumber = /[0-9]/;
const isSymbol = /[!@#$%^&*(),.?":{}|<>£[\]¤/\-_]/;

export { emailRegex, isNumber, isSymbol, lowercase, uppercase, yearRegex };
