const mainFunctions = require("./main");

module.exports = {
  // main Database
  createPackageReservation: mainFunctions.createPackageReservation,
  getIdListOfPackageReservationByField:
    mainFunctions.getIdListOfPackageReservationByField,
  getPackageReservationById: mainFunctions.getPackageReservationById,
  getPackageReservationAggById: mainFunctions.getPackageReservationAggById,
  getPackageReservationListByQuery:
    mainFunctions.getPackageReservationListByQuery,
  getPackageReservationStatsByQuery:
    mainFunctions.getPackageReservationStatsByQuery,
  getPackageReservationByQuery: mainFunctions.getPackageReservationByQuery,
  updatePackageReservationById: mainFunctions.updatePackageReservationById,
  updatePackageReservationByIdList:
    mainFunctions.updatePackageReservationByIdList,
  updatePackageReservationByQuery:
    mainFunctions.updatePackageReservationByQuery,
  deletePackageReservationById: mainFunctions.deletePackageReservationById,
  deletePackageReservationByQuery:
    mainFunctions.deletePackageReservationByQuery,
  dbScriptCreatePackagereservation:
    mainFunctions.dbScriptCreatePackagereservation,
  dbScriptUpdatePackagereservation:
    mainFunctions.dbScriptUpdatePackagereservation,
  dbScriptDeletePackagereservation:
    mainFunctions.dbScriptDeletePackagereservation,
  dbScriptGetPackagereservation: mainFunctions.dbScriptGetPackagereservation,
  dbScriptListPackagereservations:
    mainFunctions.dbScriptListPackagereservations,
};
