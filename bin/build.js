const { loadData } = require('../src/parser2');
const { getAllPilots, getAllEmpirePilots, getAllRebelPilots } = require('../src/selector');

const model = loadData();

console.dir(getAllPilots(model));
