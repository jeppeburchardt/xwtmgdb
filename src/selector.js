const getAllPilots = model => Object
  .keys(model.pilots)
  .map(key => model.pilots[key])
  .reduce((all, pilot) => [...all, ...Object.keys(pilot).map(key => pilot[key])], [])
  .sort((a, b) => a.name.localeCompare(b.name));

const getAllEmpirePilots = model => getAllPilots(model).filter(p => p.faction === 'empire');

const getAllRebelPilots = model => getAllPilots(model).filter(p => p.faction === 'rebels');

module.exports = {
  getAllPilots,
  getAllEmpirePilots,
  getAllRebelPilots,
};
