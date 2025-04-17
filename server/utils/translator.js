import fs from 'fs';
import Papa from 'papaparse';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the correct path to translations.csv
const csvFilePath = path.join(__dirname, '../../src/locales/translation.csv');

const csvData = fs.readFileSync(csvFilePath, 'utf8');

const { data: translations } = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  delimiter: ';',
});

// Convert array to object for easy lookup
const translationMap = {};

translations.forEach((row) => {
  if (row.key) {
    translationMap[row.key] = { en: row.en, da: row.da };
  } else {
    console.error("CSV parsing issue: Row does not have a 'key'", row);
  }
});

// Translation function
export const t = (key, lang = 'en') => {
  lang = lang?.replace(/^"+|"+$/g, '') || 'en'; // remove leading/trailing double quotes
  const translation = translationMap[key]?.[lang];

  if (translation === undefined || translation === null) {
    console.warn(`Missing translation for key "${key}" in lang "${lang}"`);
    return key;
  }

  return translation;
};
