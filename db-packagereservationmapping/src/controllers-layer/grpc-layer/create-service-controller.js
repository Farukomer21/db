const PackageReservationMappingServiceGrpcController = require("./PackageReservationMappingServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new PackageReservationMappingServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
