const { Location } = require("../models/location");

const findOrAddLocation = async (locationname) => {
  const existinglocations = await Location.findAll({
    where: { name: locationname },
  });
  if (existinglocations.length === 1) {
    let returnedlocation = existinglocations[0];
    return returnedlocation;
  }
  let returnedlocation = await Location.create({
    name: locationname,
  });
  return returnedlocation;
};

module.exports = {
  findOrAddLocation,
};
