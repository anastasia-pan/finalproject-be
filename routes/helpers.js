const { Location } = require("../models/location");

const findOrAddLocation = async (locationparam) => {
  const existinglocations = await Location.findAll({
    where: { name: locationparam },
  });
  if (existinglocations.length === 1) {
    let returnedlocation = existinglocations[0];
    return returnedlocation;
  }
  let returnedlocation = await Location.create({
    name: locationparam,
  });
  return returnedlocation;
};

module.exports = {
  findOrAddLocation,
};
