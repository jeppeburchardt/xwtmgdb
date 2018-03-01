const { join } = require('path');
const { safeLoad } = require('js-yaml');
const { lstatSync, readdirSync, readFileSync } = require('fs');

const isDirectory = source => lstatSync(source).isDirectory();

const loadOrEmpty = source => isDirectory(source) ? '' : readFileSync(source, 'utf8');

const getDirectories = source => readdirSync(source)
  .map(name => ({
    source: source,
    name: name,
    firstname: name.split('.')[0],
    path: join(source, name)
  }))
  .reduce((obj, ref) => {
    let info = {};
    if (isDirectory(ref.path)) {
      info[ref.name] = Object.assign(
        {},
        obj[ref.name],
        getDirectories(ref.path)
      );
    } else {
      info[ref.firstname] = Object.assign(
        {},
        obj[ref.firstname],
        safeLoad(loadOrEmpty(ref.path))
      );
    }
    return Object.assign({}, obj, info);
  }, {});

const loadData = () => getDirectories(join(__dirname, '../data'));

module.exports = {
  loadData,
};
