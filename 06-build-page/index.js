const fsPromises = require('fs').promises;
const path = require('path');

(async () => {
  await fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  const filePathCss = path.join(__dirname, 'project-dist/style.css');
  await fsPromises.rm(filePathCss, {force: true});
  const filesCss = await fsPromises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  for (const file of filesCss) {
    const data = await fsPromises.readFile(`${file.path}/${file.name}`);
    await fsPromises.appendFile(filePathCss, data);
  }

  const templateData = await fsPromises.readFile(path.join(__dirname, 'template.html'));
  const placeholderRegex = /{{(.*?)}}/g;
  const matches = [];
  let match;
  while ((match = placeholderRegex.exec(templateData.toString())) !== null) {
    matches.push(match[0]);
  }

  let templateStringForReplace = templateData.toString();

  const filesHtml = await fsPromises.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
  for (const item of matches) {
    let name = item.slice(2, item.length - 2) + '.html';
    for (const file of filesHtml) {
      if (file.name === name) {
        let data = await fsPromises.readFile(`${file.path}/${file.name}`);
        templateStringForReplace = templateStringForReplace.replace(item, data.toString());
      }
    }
  }
  const indexHtmlPath = path.join(__dirname, 'project-dist/index.html');
  await fsPromises.writeFile(indexHtmlPath, templateStringForReplace);

  await fsPromises.mkdir(path.join(__dirname, 'project-dist/assets'), { recursive: true });
  const files = await fsPromises.readdir(path.join(__dirname, 'assets'), { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      await fsPromises.mkdir(path.join(__dirname, `project-dist/assets/${file.name}`), { recursive: true });
      const deepFiles = await fsPromises.readdir(`${file.path}/${file.name}`, { withFileTypes: true });
      for (const deepFile of deepFiles) {
        await fsPromises.copyFile(`${deepFile.path}/${deepFile.name}`, `${path.join(__dirname, 'project-dist/assets')}/${file.name}/${deepFile.name}`);
      }
    }
  }
})();
