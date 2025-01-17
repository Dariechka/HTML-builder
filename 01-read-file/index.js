const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
stream.on('data', (chunk) => {
  console.log(chunk.toString());
});
stream.on('end', () => {
  console.log('There will be no more data.');
});
