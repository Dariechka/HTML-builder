const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
  }
  for (const file of files) {
    if (file.isDirectory()) {
      continue;
    }
    
    const extensionName = path.extname(file.name);
    const fileName = path.basename(file.name, extensionName);
    
    try {
      const stats = fs.statSync(`${file.path + '/' + file.name}`);
      const size = stats.size/1000;
      console.log(fileName + ' ' + '-' + ' ' + extensionName.slice(1) + ' ' + '-' + ' ' + size + 'kb');
    } catch (err) {
      console.error(err);
    }
    
  }
})

