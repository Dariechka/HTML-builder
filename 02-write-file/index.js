const fs = require('fs');
const readline = require('readline');
const path = require('path');

const writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter your sentence: '
});

rl.prompt();

rl.on('line', (line) => {
  if (line === 'exit') {
    rl.close();
  } else {
    writableStream.write(line + '\n');
    rl.prompt();
  }
}).on('close', () => {
  process.stdout.write('farewell' + '\n');
  writableStream.close();
  process.exit(0);
});