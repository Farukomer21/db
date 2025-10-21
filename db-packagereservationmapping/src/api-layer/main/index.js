module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // PackageReservation Db Object
  CreatePackageReservationManager: require("./packageReservation/create-packagereservation-api"),
  UpdatePackageReservationManager: require("./packageReservation/update-packagereservation-api"),
  DeletePackageReservationManager: require("./packageReservation/delete-packagereservation-api"),
  GetPackageReservationManager: require("./packageReservation/get-packagereservation-api"),
  ListPackageReservationsManager: require("./packageReservation/list-packagereservations-api"),
};
