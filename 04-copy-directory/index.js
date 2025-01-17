const fs = require('fs').promises;
const path = require('path');

(async () => {
  await fs.rm(path.join(__dirname, 'files-copy'), {
    recursive: true,
    force: true,
  });

  await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

  const files = await fs.readdir(path.join(__dirname, 'files'), {
    withFileTypes: true,
  });

  for (const file of files) {
    await fs.copyFile(
      `${file.parentPath + '/' + file.name}`,
      `${file.parentPath + '-copy' + '/' + file.name}`,
    );
  }
})();
