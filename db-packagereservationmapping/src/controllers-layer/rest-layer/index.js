const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  PackageReservationMappingServiceRestController: require("./PackageReservationMappingServiceRestController"),
  ...sessionRouter,
};
