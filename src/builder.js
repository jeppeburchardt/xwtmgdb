const { renderFile } = require('pug');
const { join, dirname } = require('path');
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { icons } = require('../templates/filters');

const ensureDirectoryExistence = (filePath) => {
  var dir = dirname(filePath);
  if (existsSync(dir)) {
    return filePath;
  }
  ensureDirectoryExistence(dir);
  mkdirSync(dir);
  return filePath;
}

const buildFile = ({ filename, data, isIndex }) => {
  const r = new RegExp(/([-a-z]+)\/([-a-z]+)\/([-a-z]+)(\.yaml)?$/, 'i');
  const matches = r.exec(filename);
  const x = matches[1];
  const y = matches[2];
  const z = matches[3];
  let html = '';
  let outputFile = '';

  if (isIndex) {

  } else {
    html = renderFile(
      join(__dirname, `../templates/${kind}.pug`),
      Object.assign({
        pretty: true,
        icons,
      }, data)
    );
  }



  // const html = renderFile(
  //   join(__dirname, `../templates/${kind}.pug`),
  //   Object.assign({
  //     pretty: true,
  //     icons,
  //   }, data)
  // );
  //
  // return writeFileSync(ensureDirectoryExistence(join(__dirname, `../output/${kind}/${type}/${name}.html`)), html);
};

const saveFile = () => {

};


module.exports = {
  buildFile,
};
