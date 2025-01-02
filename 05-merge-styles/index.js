const fsPromises = require('fs').promises;
const path = require('path');

(async () => {
  const filePath = path.join(__dirname, 'project-dist/bundle.css');
  await fsPromises.rm(filePath, {force: true});
  const files = await fsPromises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  const cssFiles = files.filter((file) => path.extname(file.name) === '.css');
  for (const cssFile of cssFiles) {
    const data = await fsPromises.readFile(`${cssFile.path}/${cssFile.name}`);
    await fsPromises.appendFile(filePath, data);
  }
})();
