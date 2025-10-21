const PackageReservationMappingServiceMcpController = require("./PackageReservationMappingServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new PackageReservationMappingServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
