module.exports = {
  PackageReservationMappingServiceManager: require("./service-manager/PackageReservationMappingServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // PackageReservation Db Object
  CreatePackageReservationManager: require("./main/packageReservation/create-packagereservation-api"),
  UpdatePackageReservationManager: require("./main/packageReservation/update-packagereservation-api"),
  DeletePackageReservationManager: require("./main/packageReservation/delete-packagereservation-api"),
  GetPackageReservationManager: require("./main/packageReservation/get-packagereservation-api"),
  ListPackageReservationsManager: require("./main/packageReservation/list-packagereservations-api"),
  integrationRouter: require("./integrations/testRouter"),
};
