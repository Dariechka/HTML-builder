const fs = require('fs');
const readline = require('readline');
const path = require('path');
const process = require('process');

const writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  rl.question(question, (answer) => {
    if (answer.trim() === 'exit') {
      rl.close();
    } else {
      writableStream.write(answer + '\n');
      askQuestion(question);
    }
  });
};

const exit = (farewell) => {
  process.stdout.write(farewell);
  writableStream.close();
  process.exit();
};

rl.on('close', () => {
  exit('farewell' + '\n');
}).on('SIGINT', () => {
  exit('\n' + 'farewell' + '\n');
});

askQuestion('Enter your sentence: ');
