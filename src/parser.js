const { lstatSync, readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const { safeLoad } = require('js-yaml');
const { buildFile } = require('./builder');

const isDirectory = source => lstatSync(source).isDirectory();

const loadOrEmpty = source => isDirectory(source) ? '' : readFileSync(source, 'utf8');

const getDirectories = source => readdirSync(source)
  .map(name => join(source, name))
  .reduce((curr, acc) => {
    return [...curr, acc, ...(isDirectory(acc) ? getDirectories(acc) : [])];
  }, []);
  //.filter(item => !isDirectory(item));

const files = getDirectories(join(__dirname, '../data'))

// console.log(files);

const objects = files.map(filename => ({
  filename: filename,
  isIndex: isDirectory(filename),
  data: safeLoad(loadOrEmpty(filename)),
}));

// console.log(objects);



const htmls = objects.map(item => buildFile(item));

// console.log(htmls);
