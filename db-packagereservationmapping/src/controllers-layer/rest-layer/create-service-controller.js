const PackageReservationMappingServiceRestController = require("./PackageReservationMappingServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new PackageReservationMappingServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
