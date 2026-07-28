import fs from 'fs';
import path from 'path';

const translationFile = 'src/locales/da.json';
const sourceDirectory = 'src';

const translations = JSON.parse(fs.readFileSync(translationFile, 'utf8'));
const translationKeys = new Set(Object.keys(translations));

const sourceFiles = [];

function findSourceFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      findSourceFiles(filePath);
      continue;
    }

    if (/\.(ts|tsx)$/.test(entry.name)) {
      sourceFiles.push(filePath);
    }
  }
}

findSourceFiles(sourceDirectory);

const missingTranslationKeys = new Set();

for (const filePath of sourceFiles) {
  const content = fs.readFileSync(filePath, 'utf8');

  const dotMatches = content.matchAll(/language\.([A-Za-z0-9_]+)/g);

  for (const match of dotMatches) {
    const translationKey = match[1];

    if (!translationKeys.has(translationKey)) {
      missingTranslationKeys.add(translationKey);
    }
  }

  const bracketMatches = content.matchAll(
    /language\[['"]([A-Za-z0-9_]+)['"]\]/g,
  );

  for (const match of bracketMatches) {
    const translationKey = match[1];

    if (!translationKeys.has(translationKey)) {
      missingTranslationKeys.add(translationKey);
    }
  }
}

if (missingTranslationKeys.size === 0) {
  console.log('✅ All static translation keys exist.');
  process.exit(0);
}

console.error('\n❌ Missing translation keys:\n');

for (const translationKey of [...missingTranslationKeys].sort()) {
  console.error(`- ${translationKey}`);
}

process.exit(1);
