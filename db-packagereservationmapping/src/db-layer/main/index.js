const packageReservationFunctions = require("./packageReservation");

module.exports = {
  // main Database
  createPackageReservation:
    packageReservationFunctions.createPackageReservation,
  getIdListOfPackageReservationByField:
    packageReservationFunctions.getIdListOfPackageReservationByField,
  getPackageReservationById:
    packageReservationFunctions.getPackageReservationById,
  getPackageReservationAggById:
    packageReservationFunctions.getPackageReservationAggById,
  getPackageReservationListByQuery:
    packageReservationFunctions.getPackageReservationListByQuery,
  getPackageReservationStatsByQuery:
    packageReservationFunctions.getPackageReservationStatsByQuery,
  getPackageReservationByQuery:
    packageReservationFunctions.getPackageReservationByQuery,
  updatePackageReservationById:
    packageReservationFunctions.updatePackageReservationById,
  updatePackageReservationByIdList:
    packageReservationFunctions.updatePackageReservationByIdList,
  updatePackageReservationByQuery:
    packageReservationFunctions.updatePackageReservationByQuery,
  deletePackageReservationById:
    packageReservationFunctions.deletePackageReservationById,
  deletePackageReservationByQuery:
    packageReservationFunctions.deletePackageReservationByQuery,
  dbScriptCreatePackagereservation:
    packageReservationFunctions.dbScriptCreatePackagereservation,
  dbScriptUpdatePackagereservation:
    packageReservationFunctions.dbScriptUpdatePackagereservation,
  dbScriptDeletePackagereservation:
    packageReservationFunctions.dbScriptDeletePackagereservation,
  dbScriptGetPackagereservation:
    packageReservationFunctions.dbScriptGetPackagereservation,
  dbScriptListPackagereservations:
    packageReservationFunctions.dbScriptListPackagereservations,
};
