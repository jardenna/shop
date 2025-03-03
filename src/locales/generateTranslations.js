import csv from 'csv-parser';
import fs from 'fs';

// Function to remove BOM if it exists
function stripBOM(content) {
  return content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}

// Read CSV file and strip BOM
const results = [];
const filePath = 'src/locales/translation.csv';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const cleanedData = stripBOM(data);

  // Write the cleaned data back to a temporary file
  const tempFilePath = 'src/locales/temp_translation.csv';
  fs.writeFileSync(tempFilePath, cleanedData);

  fs.createReadStream(tempFilePath)
    .pipe(csv({ separator: ';', headers: ['key', 'en', 'da'], skipLines: 1 }))
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      try {
        const enJson = {};
        const daJson = {};

        results.forEach((row) => {
          if (row.key && row.en && row.da) {
            enJson[row.key] = row.en;
            daJson[row.key] = row.da;
          } else {
            console.error('Missing data in row:', row);
          }
        });

        // Write to en.json
        fs.writeFileSync(
          'src/locales/en.json',
          JSON.stringify(enJson, null, 2),
        );

        // Write to da.json
        fs.writeFileSync(
          'src/locales/da.json',
          JSON.stringify(daJson, null, 2),
        );
      } catch (error) {
        console.error('Error processing CSV:', error);
      }

      // Clean up temporary file
      fs.unlinkSync(tempFilePath);
    })
    .on('error', (error) => {
      console.error('Error reading CSV:', error);
    });
});
