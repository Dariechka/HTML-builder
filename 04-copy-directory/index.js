const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

fs.readdir(
  path.join(__dirname, 'files'),
  { withFileTypes: true },
  (err, files) => {
    for (const file of files) {
      fs.copyFile(
        `${file.path + '/' + file.name}`,
        `${file.path + '-copy' + '/' + file.name}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        },
      );
    }
  },
);
