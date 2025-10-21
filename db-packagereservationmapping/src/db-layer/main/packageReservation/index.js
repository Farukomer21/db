const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createPackageReservation: utils.createPackageReservation,
  getIdListOfPackageReservationByField:
    utils.getIdListOfPackageReservationByField,
  getPackageReservationById: utils.getPackageReservationById,
  getPackageReservationAggById: utils.getPackageReservationAggById,
  getPackageReservationListByQuery: utils.getPackageReservationListByQuery,
  getPackageReservationStatsByQuery: utils.getPackageReservationStatsByQuery,
  getPackageReservationByQuery: utils.getPackageReservationByQuery,
  updatePackageReservationById: utils.updatePackageReservationById,
  updatePackageReservationByIdList: utils.updatePackageReservationByIdList,
  updatePackageReservationByQuery: utils.updatePackageReservationByQuery,
  deletePackageReservationById: utils.deletePackageReservationById,
  deletePackageReservationByQuery: utils.deletePackageReservationByQuery,
  dbScriptCreatePackagereservation:
    dbApiScripts.dbScriptCreatePackagereservation,
  dbScriptUpdatePackagereservation:
    dbApiScripts.dbScriptUpdatePackagereservation,
  dbScriptDeletePackagereservation:
    dbApiScripts.dbScriptDeletePackagereservation,
  dbScriptGetPackagereservation: dbApiScripts.dbScriptGetPackagereservation,
  dbScriptListPackagereservations: dbApiScripts.dbScriptListPackagereservations,
};
