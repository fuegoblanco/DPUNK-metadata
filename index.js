const fs = require('fs');
const path = require('path');

const directoryPath = './metadata';
let allData = [];

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(filename => {
        if (filename.endsWith('.json')) {
            const filePath = path.join(directoryPath, filename);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            allData.push(data);
        }
    });

    allData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
   
    const combinedFilePath = './metadata.json';

    fs.writeFileSync(combinedFilePath, JSON.stringify(allData, null, 4));
    console.log("All JSON files have been combined into metadata.json file.");
});
